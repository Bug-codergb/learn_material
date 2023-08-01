### 模板编译--AST

> vue3模板编译核心代码在 packages/compiler-core入口在src/compile中,将模板转换为抽象语法树通过`baseParse`函数

`
  /**
     @template: 传入模板
     @options: 编译时所需配置项
   */
  baseParser(template,options){}
`

- parseChildren

模板编译第一步就是将传入的模板通过parseChildren进行转换，该函数通过正则表达式不断匹配元素，插值语法，标签上的属性，指令，文本节点等，每匹配一次，通过advanceBy向前推进（截取字符串），直至template字符串的长度为0。

`
 const parent = last(ancestors) 获取当前节点的父节点，last用于获取数组的最后一个元素。
`

`
  const nodes = [] //用于存储解析完毕的节点
`

`
  while (!isEnd(context, mode, ancestors)) {
    //遍历字符串，直至所有节点匹配完毕
  }
`
- parseELement
- parseText
- parseTag
- parseAttributes
- parseAttribute
- parseAttributeValue