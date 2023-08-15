### 模板编译--AST

> vue3模板编译核心代码在 packages/compiler-core入口在src/compile中,将模板转换为抽象语法树通过`baseParse`函数

```javascript
/*
  @template: 传入模板
  @options: 编译时所需配置项
*/
baseParser(template,options){}
```

- parseChildren

模板编译第一步就是将传入的模板通过```parseChildren```进行转换，该函数通过正则表达式不断匹配元素，插值语法，标签上的属性，指令，文本节点等，每匹配一次，通过```advanceBy```向前推进（截取字符串），直至template字符串的长度为0。

```javascript
const parent = last(ancestors) 获取当前节点的父节点，last用于获取数组的最后一个元素。
const nodes = [] //用于存储解析完毕的节点
while (!isEnd(context, mode, ancestors)) {
    //遍历字符串，直至所有节点匹配完毕
    // 分别解析插值语法，元素，注释，文本节点等
    //removedWhitespace 处理解析后的空格
 }
```

```isEnd```判断当前标签是否为结束标签，首先回判断当前```TextModes```的类型，DATAT则为普通元素，判断当前解析template的开头为</，则遍历当前的祖先元素数组，查找匹配(ancestor中存储这每一个父节点至元素节点，其格式为```{type,tag,tagType,props,children})```，通过tag，去和祖先元素数组匹配。通过函数```startsWithEndTagOpen```判断

```javascript
function isEnd(
  context: ParserContext,
  mode: TextModes,
  ancestors: ElementNode[]
): boolean {
  const s = context.source

  switch (mode) {
    case TextModes.DATA:
      if (startsWith(s, '</')) {
        // TODO: probably bad performance
        for (let i = ancestors.length - 1; i >= 0; --i) {
          if (startsWithEndTagOpen(s, ancestors[i].tag)) {
            return true
          }
        }
      }
      break
  }
  return !s //如果字符串为空
}

```

startsWithEndTagOpen函数首先判断其是否以</开头，通过slice截取当前的tag名称，判断其是否与祖先元素的tag相同并且以>结尾，如果是自结束标签则以/>结尾。

```javascript
function startsWithEndTagOpen(source: string, tag: string): boolean {
  return (
    startsWith(source, '</') &&
    source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase() &&
    /[\t\r\n\f />]/.test(source[2 + tag.length] || '>')
  )
}
```

- parseELement

parseElement用于解析元素，其内部实现通过parseTag解析标签，parseElement处理parseTag解析后的结果，一般情况下获取解析后的element后，将其添加到祖先元素后，通过**递归**的形式再次调用parseChildren解析其子元素，解析子元素后，将其从ancestor中弹出。将解析出来的element（children）赋值给element。

```javascript
/* 主要核心代码 */
const parent = last(ancestors);
const element = parseTag(context, TagType.Start, parent)
// Children.
ancestors.push(element);
const mode = context.options.getTextMode(element, parent)
const children = parseChildren(context, mode, ancestors);//递归调用parseChildren
ancestors.pop();
element.children = children;
```

- parseText

parseText用于解析文本节点，

```javascript
const endTokens = ['<', context.options.delimiters[0]]//如果是标签的开头或者插值语法的开头

  let endIndex = context.source.length
  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i], 1)
    if (index !== -1 && endIndex > index) {
      endIndex = index
    }
  }
  const content = parseTextData(context, endIndex, mode) //获取到文本节点的内容

  return {
    type: NodeTypes.TEXT,//节点类型(普通文本节点，插值语法为INTERPOLATION)
    content,
    loc: getSelection(context, start)
  }

// 该方法用于解析文本内容
function parseTextData(
  context: ParserContext,
  length: number,
  mode: TextModes
): string {
  const rawText = context.source.slice(0, length)
  advanceBy(context, length)
  if (
    mode === TextModes.RAWTEXT ||
    mode === TextModes.CDATA ||
    !rawText.includes('&')
  ) {//直接返回
    return rawText
  } else {
    //特殊字符处理
    return context.options.decodeEntities(
      rawText,
      mode === TextModes.ATTRIBUTE_VALUE
    )
  }
}
```

- parseTag

parseTag主要解析当前元素的标签(开始标签，结束标签)，通过正则表达式```/^<\/?([a-z][^\t\r\n\f />]*)/i```匹配元素名称

```javascript
const match = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source)!
const tag = match[1] //获取标签名称
let props = parseAttributes(context, type) //通过核心方法parseAttributes解析当前元素上的属性(attribute,指令等)

let tagType = ElementTypes.ELEMENT //默认情况下标签类型为元素类型
  if (!context.inVPre) {
    if (tag === 'slot') {
      tagType = ElementTypes.SLOT//插槽类型
    } else if (tag === 'template') {//模板类型
      if (
        props.some(
          p =>
            p.type === NodeTypes.DIRECTIVE && isSpecialTemplateDirective(p.name)
        )
      ) {
        tagType = ElementTypes.TEMPLATE
      }
    } else if (isComponent(tag, props, context)) {//组件类型
      tagType = ElementTypes.COMPONENT
    }
  }
```

- parseAttributes

parseAttributes主要用于收集元素上的属性，解析属性通过parseAttribute和parseAttributeValue，目前vue模板语法中主要的属性类型有2种，**指令类型**和**attr类型**(行内样式，元素原始属性class，id等)；

```javascript
const props = []
  const attributeNames = new Set<string>()//用于判断当前元素上属性类型是否存在重复
  /*
    <div class="app" class="foo"> 属性存在重复
    <div class="app" :class="{app:true}">不重复
    <div class="app" v-bind="{class:'app'}">不重复，合并操作在parseElement解析后通过相关方法合并
  */
  while (
    context.source.length > 0 &&
    !startsWith(context.source, '>') &&
    !startsWith(context.source, '/>')
  ) { // template的长度不为0，开头不以>或者/>, 形如 class="app" @click="handler">点击</div>
    
    const attr = parseAttribute(context, attributeNames)//通过核心方法解析每一个属性
    if (
      attr.type === NodeTypes.ATTRIBUTE &&
      attr.value &&
      attr.name === 'class'
    ) {
      attr.value.content = attr.value.content.replace(/\s+/g, ' ').trim() //所有class的值对其的多个空格做替换
    }

    if (type === TagType.Start) {
      props.push(attr)//添加值props中
    }	
  }
```

- parseAttribute

解析每一个属性，标识其类型，所有的属性最后都存储于ast节点的props属性上，通过正则表达式匹配属性名称```/^[^\t\r\n\f />][^\t\r\n\f />=]*/``` 

```javascript
const start = getCursor(context)
const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source)!
const name = match[0] //获取属性名称
nameSet.add(name) // 用于判断属性是否重复
let value = parseAttributeValue(context);通过核心方法parseAttributeValue解析属性值

if (!context.inVPre && /^(v-[A-Za-z0-9-]|:|\.|@|#)/.test(name)) {
  //用于匹配指令
  
  //通过该正则表达式匹配指令相关属性(指令名称(bind,on,或者指令简写@click,#default),指令修饰符等)
  const match =/(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(name)
  //这里同时要处理动态属性名 :[key] = "app",静态属性名 :key="app",通过isStatic标识;
}else{
  //用于匹配attr
}

/*
  vue在模板编译的时候，会通过一系列枚举类型(NodeTypes)来描述节点,后期在生成code的时候，会依赖于NodeTypes
  如模板编译的过程中，对于指令，它的type为DIRECTIVE，指令的arg和exp的type都为SIMPLE_EXPRESSION,
  对于attr它的type为ATTRIBUTE
*/
```

- parseAttributeValue

```javascript
const start = getCursor(context)
  let content: string;//用于存储解析出来的属性值
  const quote = context.source[0]//引号开头
  const isQuoted = quote === `"` || quote === `'`
  if (isQuoted) {
    // Quoted value.
    advanceBy(context, 1)

    const endIndex = context.source.indexOf(quote)
    if (endIndex === -1) { // 没有引号结尾则直接取template长度
      content = parseTextData(
        context,
        context.source.length,
        TextModes.ATTRIBUTE_VALUE
      )
    } else {
      //截取属性值
      content = parseTextData(context, endIndex, TextModes.ATTRIBUTE_VALUE)
      advanceBy(context, 1)
    }
  } else {
    // Unquoted
    const match = /^[^\t\r\n\f >]+/.exec(context.source)
    if (!match) {
      return undefined
    }
    content = parseTextData(context, match[0].length, TextModes.ATTRIBUTE_VALUE)
  }
  return { content, isQuoted, loc: getSelection(context, start) }
```

- parseInterpolation

parseInterpolation用于解析插值语法主要通过截取{{ }}内部的内容，NodeTypes类型为INTERPOLATION，由于在实际开发的过程中，用户书写插值语法会存在换行或者空格，因此需要处理内容的位置信息。

- 最后解析出ast结果

  - **文本节点**

    <img src="/Users/guobin/Library/Application Support/typora-user-images/image-20230814111412148.png" alt="image-20230814111412148" style="zoom:50%;" />

  - **指令**

    <img src="/Users/guobin/Library/Application Support/typora-user-images/image-20230814111432798.png" alt="image-20230814111432798" style="zoom:50%;" />

  