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

模板编译第一步就是将传入的模板通过parseChildren进行转换，该函数通过正则表达式不断匹配元素，插值语法，标签上的属性，指令，文本节点等，每匹配一次，通过advanceBy向前推进（截取字符串），直至template字符串的长度为0。

```javascript
const parent = last(ancestors) 获取当前节点的父节点，last用于获取数组的最后一个元素。
const nodes = [] //用于存储解析完毕的节点
while (!isEnd(context, mode, ancestors)) {
    //遍历字符串，直至所有节点匹配完毕
 }
```

isEnd判断当前标签是否为结束标签，首先回判断当前TextModes的类型，DATAT则为普通元素，判断当前解析template的开头为</，则遍历当前的祖先元素数组，查找匹配(ancestor中存储这每一个父节点至元素节点，其格式为```{type,tag,tagType,props,children})```，通过tag，去和祖先元素数组匹配。通过函数```startsWithEndTagOpen```判断

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

解析每一个属性，标识其类型，所有的属性最后都存储于ast节点的props属性上

```javascript
const start = getCursor(context)
  const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source)!
  const name = match[0]
```



- parseAttributeValue