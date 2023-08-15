> transform阶段位于parser(ast转换)之后，由于抽象语法树只是通过js对象描述template模板，而transform则是将ast转换为更加贴近vue语法的js对象(对ast的树节点做一层转换)。transform是模板编译非常重要的一个过程，涵盖v-if,v-show,v-for等指令的转换，patchFlag靶向更新，以及block机制，静态提升等。为diff阶段提供优化。

tranform入口位于compile-core/src/compile下的baseCompile函数下的transform函数，transofrm位于compile-core/src/transform文件中。

```javascript
export function transform(root: RootNode, options: TransformOptions) {
  const context = createTransformContext(root, options)//创建转换上下文，vue在ast转换，transform转换，codengen过程都会																												//创建一个context
  traverseNode(root, context)//开始转换节点，存在递归
  if (options.hoistStatic) {//开启静态提升
    hoistStatic(root, context)
  }
  if (!options.ssr) {//创建跟节点codegen ,vue在ast节点会为每一个节点添加一个codegenNode属性,在transform阶段为其赋值
    								 //该属性用于后期生成code
    createRootCodegen(root, context)
  }
  // finalize meta information
  root.helpers = new Set([...context.helpers.keys()]) //需要在runtime-core/runtime-dom中传入实现方式
  root.components = [...context.components] //组件
  root.directives = [...context.directives] //指令
  root.imports = context.imports //模块化
  root.hoists = context.hoists//静态提升
  root.temps = context.temps
  root.cached = context.cached
}
```

- traverseNode

```traverseNode```用于处理节点，分别通过```nodeTransforms```每一个方法对节点进行处理，其处理的顺序通过```getBaseTransformPreset```返回。而```traverseNode```处理节点后会返回一个函数，其中执行又是通过倒叙，类似于```koa```的洋葱模型，每转换一个节点后，判断节点的类型，如果是IF类型则需要处理(```traverseNode```)其分支节点，如果是分支节点，元素节点，根节点则通过```traverseChildren```转换，```traverseChildren```则是遍历每一个节点再通过```traverseNode```处理节点。处理节点的过程中会将当前节点赋值给```context.currentNode```

```javascript
export function getBaseTransformPreset(
  prefixIdentifiers?: boolean
): TransformPreset {
  return [
    [
      transformOnce,
      transformIf,
      transformMemo,
      transformFor,
      ...(__COMPAT__ ? [transformFilter] : []),
      ...(!__BROWSER__ && prefixIdentifiers
        ? [
            trackVForSlotScopes,
            transformExpression
          ]
        : __BROWSER__ && __DEV__
        ? [transformExpression]
        : []),
      transformSlotOutlet,
      transformElement,
      trackSlotScopes,
      transformText
    ],
    {
      on: transformOn,
      bind: transformBind,
      model: transformModel
    }
  ]
}
```

- hoistStatic

hoistStatic静态提升用于将不会发生改变的元素或者元素属性等，提升到render函数顶部，这样在diff的时候，直接赋值即可，无需做多余patch。如下图中div包裹的app，div包裹的web，div包裹的js，以及class为app的属性(只提升属性节点)；

- block

block机制则是将需要更新的属性，元素内容收集到dynamicChildren，patch的时候只需要对比dynamicChildren即可，一般情况下，跟节点会被block包裹，block的实现机制在runtime-core中，transofrm阶段则是标识那些节点可以开启block，通过节点的isBlock属性标识。在transform阶段存在createVNodeCall函数以及convertToBlock函数用于设置isBlock属性。