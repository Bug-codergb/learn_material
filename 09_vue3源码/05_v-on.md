> vue通过v-on进行时间绑定，v-on:click="handlers"，v-on简写形式为@click="handlers"，那么vue是如何处理时间绑定的呢？本文将大致介绍事件指令的实现原理（第一次学习源码）。

- 以以下例子展开

```html
<div>
  <button @click="handlers">点击</button>
</div>
```

- AST转换后的数据结构

  <img src="/Users/guobin/Desktop/1.png" alt="image-20230817082004276" style="zoom:50%;" />

  props的类型为directives，指令名称为on，argument的content为事件的名称为,exp为事件的处理函数。

- transform阶段

v-on的transform阶段位于compiler-core/src/transforms/vOn下的transformOn

```javascript
export const transformOn = (dir, node, context, augmentor) => {
  const { loc, modifiers, arg } = dir;//获取节点指令相关属性，loc位置信息，modifiers修饰符，arg事件名称
  if (!dir.exp && !modifiers.length) {
    console.error('error');// v-on表达式不存在时
  }
  let eventName;
  if (arg.type === NodeTypes.SIMPLE_EXPRESSION) {
    if (arg.isStatic) {//如果事件名称为静态(@click="handlers"，动态类型为@[app]="handlers")
      let rawName = arg.content;//获取到事件名称
      if (rawName.startsWith('vue:')) {
        rawName = `vnode-${rawName.slice(4)}`;
      }
      const eventString = node.tagType !== ElementTypes.ELEMENT || rawName.startsWith('vnode')
        || !/[A-Z]/.test(rawName)
        ? toHandlerKey(camelize(rawName))
        : `on:${rawName}`; //格式化事件名称click->onClick
      eventName = createSimpleExpression(eventString, true, arg.loc);//创建expression对象
    } else {//动态类型
      eventName = createCompoundExpression([
        `${context.helperString(TO_HANDLER_KEY)}(`,
        arg,
        ')',
      ]);
    }
  } else {
    eventName = arg;
    eventName.children.unshift(`${context.helperString(TO_HANDLER_KEY)}(`);
    eventName.children.push(')');
  }
  // console.log(eventName);
  let { exp } = dir;//获取事件处理函数
  if (exp && !exp.content.trim()) {
    exp = undefined;
  }
  const shouldCache = context.cacheHandlers && !exp && context.inVOnce;

  if (exp) {
    const isMemberExp = isMemberExpressionBrowser(exp.content);
    //isMemberExpressionBrowser判断是否为MemberExpression，这里理解不透彻，handlers为true,handlers()为false
    
    const isInlineStatement = !(isMemberExp || fnExpRE.test(exp.content));
    //@click="handler"为true,@click="()=>{handlers()}"为false
    
    
    const hasMultipleStatements = exp.content.includes(';');
    if (isInlineStatement || (shouldCache && isMemberExp)) {
      exp = createCompoundExpression([
        `${
          isInlineStatement ? '$event' : '(...args)'
        }=>${hasMultipleStatements ? '{' : '('}`,
        exp,
        hasMultipleStatements ? '}' : ')',
      ]);
    }
  }

  let ret = {
    props: [
      createObjectProperty(
        eventName,
        exp || createSimpleExpression('()=>{}', false, loc),
      ),
    ],
  };
  if (augmentor) {
    ret = augmentor(ret);
  }
  ret.props.forEach((p) => (p.key.isHandlerKey = true));
  return ret;
};
```

经过初次transformOn处理后，数据结构为

<img src="/Users/guobin/Desktop/2.png" alt="image-20230817084034235" style="zoom:50%;" />

经过compiler-core/transformOn处理之后，vue在编译时，会通过compiler-dom/transformOn覆盖，但是compiler-dom/transformOn会依赖于compiler-core/transformOn。compiler-dom/transformOn主要处理修饰符，这里暂时先不考虑修饰的情况。感兴趣可以查看源码。

```javascript
export const transformOn = (dir, node, context) => baseTransform(dir, node, context, (baseResult) => {
  const { modifiers } = dir;
  if (!modifiers.length) {
    return baseResult;
  }
});
```

transformOn最终返回的结果会交给transformElement，transformElement返回的codegenNode为。到这里transform阶段处理事件绑定已经结束了。

<img src="/Users/guobin/Desktop/3.png" alt="image-20230817084958645" style="zoom:50%;" />

最终生成的code为

<img src="/Users/guobin/Desktop/4.png" alt="image-20230817085209812" style="zoom:50%;" />

如果不是MemberExpression，最终结果为

<img src="/Users/guobin/Desktop/5.png" alt="image-20230817085849154" style="zoom:50%;" />



> v-on编译的过程较好理解，主要是在事件修饰符编译模块较为难理解，事件处理函数需要判断绑定形式，@click="handlers"和
>
> @click="handlers()"，最终添加至vnode的props上