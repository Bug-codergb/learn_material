> v-if是实际开发中比较常用的一个指令，根据条件渲染dom。与其相关联的指令有v-else-if, v-else

v-if的转换位于compile-core/src/transforms下。通过transformIf实现

- createStructuralDirectiveTransform

通过```createStructuralDirectiveTransform```函数参数```/^(if|else|else-if)$/```匹配到```v-if```指令。生成分支节点主要通过```processIf```函数

```javascript
export function processIf(
  node: ElementNode,
  dir: DirectiveNode,
  context: TransformContext,
  processCodegen?: (
    node: IfNode,
    branch: IfBranchNode,
    isRoot: boolean
  ) => (() => void) | undefined
) {
  //如果指令不是v-else,是v-if或者是v-else-if,但是不存在条件值如<div v-if=""></div>则报错
  if (
    dir.name !== 'else' &&
    (!dir.exp || !(dir.exp as SimpleExpressionNode).content.trim())
  ) {
    const loc = dir.exp ? dir.exp.loc : node.loc
    context.onError( //
      createCompilerError(ErrorCodes.X_V_IF_NO_EXPRESSION, dir.loc)
    )//dir的exp属性是在ast阶段生成的指令的属性，用于描述指令值，如v-if="app",exp则为app,arg则不存在
    dir.exp = createSimpleExpression(`true`, false, loc)
  }

  if (dir.name === 'if') {
    const branch = createIfBranch(node, dir)//创建分支节点
    const ifNode: IfNode = {
      type: NodeTypes.IF,
      loc: node.loc,//位置信息
      branches: [branch]//将分支节点添加进来
    }
    context.replaceNode(ifNode)//用if节点替换当前的ast节点
    if (processCodegen) {//生成codegenNode
      return processCodegen(ifNode, branch, true)
    }
  } else {
    // 如果指令是v-else或者是v-else-if
    const siblings = context.parent!.children//获取其所有兄弟节点
    const comments = []
    let i = siblings.indexOf(node)//当前节点前面的所有兄弟节点
    while (i-- >= -1) {
      const sibling = siblings[i]//获取兄弟节点
      if (sibling && sibling.type === NodeTypes.COMMENT) {//注释节点跳过
        context.removeNode(sibling)
        continue
      }

      if (
        sibling &&
        sibling.type === NodeTypes.TEXT &&
        !sibling.content.trim().length
      ) {
        context.removeNode(sibling)//文本节点跳过
        continue
      }

      if (sibling && sibling.type === NodeTypes.IF) { 
        //如果当前节点是指令是v-else-if，此时sibling都是当前节点前面的兄弟节点，如果兄弟节点是分支节点，但是兄弟节点的最后一个分     				//支节点的condition为undefined则说明最后一个分支为v-else，但是当前节点为v-else-if，则说明语法错误
        if (
          dir.name === 'else-if' &&
          sibling.branches[sibling.branches.length - 1].condition === undefined
        ) {
          context.onError(
            createCompilerError(ErrorCodes.X_V_ELSE_NO_ADJACENT_IF, node.loc)
          )
        }

        // 移除当前节点
        context.removeNode()
        const branch = createIfBranch(node, dir)//创建分支节点
        sibling.branches.push(branch)//将当前节点添加至兄弟节点的分支里
        const onExit = processCodegen && processCodegen(sibling, branch, false)
        
        traverseNode(branch, context)//转换分支节点 如果是v-if下嵌套v-if
       
        if (onExit) onExit()
      
        context.currentNode = null
      } else {
        context.onError(
          createCompilerError(ErrorCodes.X_V_ELSE_NO_ADJACENT_IF, node.loc)
        )
      }
      break
    }
  }
}
//经过该方法处理，原有的三个节点变成一个节点，该节点的分支有三个节点，根据条件渲染
```

- processIf的第四个参数为最后用于生成codegenNode的函数

```javascript
return () => {
        if (isRoot) {//如果是v-if
          ifNode.codegenNode = createCodegenNodeForBranch(
            branch,
            key,
            context
          ) as IfConditionalExpression
        } else {
          // 如果是v-else
          const parentCondition = getParentCondition(ifNode.codegenNode!)
          parentCondition.alternate = createCodegenNodeForBranch(//alternate是条件不成立时所走的分支
            branch,
            key + ifNode.branches.length - 1,
            context
          )
        }
      }
```

- createCodegenNodeForBranch

```javascript
function createCodegenNodeForBranch(
  branch: IfBranchNode,
  keyIndex: number,
  context: TransformContext
): IfConditionalExpression | BlockCodegenNode | MemoExpression {
  if (branch.condition) {//如果存在条件(v-if,v-else-if)
    return createConditionalExpression(
      branch.condition,//分支节点的条件
      createChildrenCodegenNode(branch, keyIndex, context),//条件成立时的分支
      createCallExpression(context.helper(CREATE_COMMENT), [
        __DEV__ ? '"v-if"' : '""',
        'true'
      ])//条件不成立时的分支
    ) as IfConditionalExpression
  } else {
    return createChildrenCodegenNode(branch, keyIndex, context) //v-else
  }
}
```

- createChildrenCodegenNode

```javascript
function createChildrenCodegenNode(
  branch: IfBranchNode,
  keyIndex: number,
  context: TransformContext
): BlockCodegenNode | MemoExpression {
  const { helper } = context
  const keyProperty = createObjectProperty(
    `key`,
    createSimpleExpression(
      `${keyIndex}`,
      false,
      locStub,
      ConstantTypes.CAN_HOIST
    )
  )
  const { children } = branch
  const firstChild = children[0]
  const needFragmentWrapper =
    children.length !== 1 || firstChild.type !== NodeTypes.ELEMENT
  if (needFragmentWrapper) { // 需要包裹<template v-if="app"></template>
    if (children.length === 1 && firstChild.type === NodeTypes.FOR) {
      const vnodeCall = firstChild.codegenNode!
      injectProp(vnodeCall, keyProperty, context)
      return vnodeCall
    } else {
      let patchFlag = PatchFlags.STABLE_FRAGMENT
      let patchFlagText = PatchFlagNames[PatchFlags.STABLE_FRAGMENT]
      //通过createVNodeCall生成codegenNode
      return createVNodeCall(
        context,
        helper(FRAGMENT),
        createObjectExpression([keyProperty]),
        children,
        patchFlag + (__DEV__ ? ` /* ${patchFlagText} */` : ``),
        undefined,
        undefined,
        true,
        false,
        false /* isComponent */,
        branch.loc
      )
    }
  } else {
    //这里为什么存在codegenNode？因为该函数的执行是在transformElement之后，transformElement已经生成了codegenNode
    //注意每一个transformIf,transofrmElement,transformFor,的处理顺序和执行顺序
    const ret = (firstChild as ElementNode).codegenNode as
      | BlockCodegenNode
      | MemoExpression
    const vnodeCall = getMemoedVNodeCall(ret)
    // Change createVNode to createBlock.
    if (vnodeCall.type === NodeTypes.VNODE_CALL) {
      convertToBlock(vnodeCall, context)//开启block机制
    }
    // inject branch key
    injectProp(vnodeCall, keyProperty, context)
    return ret
  }
}
```

