> v-model指令为相关表单元素提供了双向绑定的功能，在实际开发中能够简化我们的开发方式，那么双向绑定是如何实现的呢，本文将介绍v-model的基本实现原理（第一次学习源码）。

- 以input为例

```html
<div>
  <input v-model="foo"/>
</div>
```

- AST转换后的v-model

<img src="/Users/guobin/Desktop/1.png" alt="image-20230816085746483" style="zoom:50%;" />

经过ast转换后得到一个描述input的javascript对象，由于input是自结束标签，children为空数组，这里核心在它的props，由于是指令，它的type为directive(attr的type为attribute)，modifiers为空组数，用于存放修饰符，这里暂时没有修饰符。v-model的argument(arg)为undefined，它的exp存储指令的值，content为值"foo"

- transform后的v-model

v-model的transform转化在目录compiler-core/transforms下的vModel,

```javascript
export const transformModel = (dir, node, context) => {
  const { exp, arg } = dir;
  if (!exp) {
    console.error('v-model不存在表达式');
  }
  const rawExp = exp.loc.source; //获取到指令值

  const expString = exp.type === NodeTypes.SIMPLE_EXPRESSION ? exp.content : rawExp;

  const propName = arg || createSimpleExpression('modelValue', true);//arg不存在，创建一个content为modelValue的、
  																																	 //expression对象	
  const eventName = arg ? isStaticExp(arg)
    ? `onUpdate:${camelize(arg.content)}`
    : createCompoundExpression(['"onUpdate:" + ', arg]) : 'onUpdate:modelValue';
  //由于arg不存在则eventName = "onUpdate:modelValue"
  
  let assignmentExp;
  const eventArg = '$event';

  assignmentExp = createCompoundExpression([
    `${eventArg} => ((`,
    exp,
    ') = $event)',
  ]);
  const props = [
    createObjectProperty(propName, dir.exp),//创建一个object对象，key为propsName,value为dir.exp;
    createObjectProperty(eventName, assignmentExp),//创建一个object对象，key为eventName，value为assignmentExp
  ];
  /*
    modelValue 就是v-model绑定的值
    onUpdate:modelValue :发出的事件
  */
  return createTransformProps(props);
};
function createTransformProps(props = []) {
  return {
    props,
  };
}
```

经过初次transform转换后，transformModel返回的结果为

<img src="/Users/guobin/Desktop/2.png" alt="image-20230816092311053" style="zoom:50%;" />

props存在2个元素，一个为v-model绑定的值，一个是修改值之后触发的事件，v-model的基本转化到这里基本结束了，但是如果实在浏览器环境下，我们需要去区分表单元素的类型(input,select,radio,checkbox)；所以vue在浏览器环境下，通过compile-dom/src/transforms下的vModel下的transformModel替换了compile-core下的vModel，但是compile-dom下的vModel依赖于compile-core下的vModel。具体实现如下。

```javascript
export const transformModel = (dir, node, context) => {
  const baseResult = baseTransform(dir, node, context);
  //这里的baseTransform就是compile-core下的transformModel,这里起了别名
  
  if (!baseResult.props.length) {
    return baseResult;
  }

  if (dir.arg) {
    console.error('v-model不应该存在arg');
  }
  function checkDuplicatedValue() {
    const value = findProp(node, 'value');
    if (value) {
      console.error('v-model error');
    }
  }
  const { tag } = node;
  if (
    tag === 'input' || tag === 'textarea'
    || tag === 'select'
  ) {
    let directiveToUse = V_MODEL_TEXT;//runtime-dom中传入的方法
    let isInvalidType = false;
    if (tag === 'input') {//文本框
      const type = findProp(node, 'type');//获取当前节点的type属性
      if (type) {
        if (type.type === NodeTypes.DIRECTIVE) {
          directiveToUse = V_MODEL_DYNAMIC;
        } else if (type.value) {
          switch (type.value.content) {
            case 'radio':
              directiveToUse = V_MODEL_RADIO;//单选
              break;
            case 'checkbox':
              directiveToUse = V_MODEL_CHECKBOX;//多选
              break;
            case 'file':
              isInvalidType = true;// 当input的<input type="file"/>不可以使用v-model
              break;
            default:
              __DEV__ && checkDuplicatedValue();
              break;
          }
        }
      } else if (hasDynamicKeyVBind(node)) {
        directiveToUse = V_MODEL_DYNAMIC;
      } else {
        __DEV__ && checkDuplicatedValue();
      }
    } else if (tag === 'select') {//选择
      directiveToUse = V_MODEL_SELECT;
    } else {
      __DEV__ && checkDuplicatedValue();
    }
    if (!isInvalidType) {
      baseResult.needRuntime = context.helper(directiveToUse);
      //这里在baseResult下添加needRuntime属性，其值为一个symbol()//根据类型判断vText,vModelRadio ...
    }
  } else {
    console.error('v-model on on validate element');
  }

  baseResult.props = baseResult.props.filter(
    (p) => !(
      p.key.type === NodeTypes.SIMPLE_EXPRESSION
      && p.key.content === 'modelValue'
    ),
  );
  return baseResult;//最终返回
};

```

最终返回的baseResult被compile-core/transforms/transformElement下的transformElement使用

```javascript
const directiveTransform = context.directiveTransforms[name];//获取指令transform,这里为transformModel
      if (directiveTransform) {
        const { props, needRuntime } = directiveTransform(prop, node, context);//获取结果,needRuntime这里为vText
        console.log(props, needRuntime);
        !ssr && props.forEach(analyzePatchFlag);
        if (isVOn && arg && !isStaticExp(arg)) { // 非静态arg :[app]= app v-on:[event] = handler

        } else {
          properties.push(...props);
        }
        if (needRuntime) {
          runtimeDirectives.push(prop);
          if (isSymbol(needRuntime)) {
            directiveImportMap.set(prop, needRuntime);
          }
        }
      }
```

在transformElement中会判断runtimeDirectives的长度，不为0则需要通过buildDirectiveArgs对指令做处理

```javascript
export function buildDirectiveArgs(dir, context) {
  const dirArgs = [];
  const runtim = directiveImportMap.get(dir);
  if (runtim) {
    dirArgs.push(context.helperString(runtim));//获取到vText
  } else {
    context.helper(RESOLVE_DIRECTIVE);//需要运行时方法
    context.directives.add(dir.name);
    dirArgs.push(toValidateId(dir.name, 'directive'));
  }
  const { loc } = dir;
  if (dir.exp) {
    dirArgs.push(dir.exp);//添加exp(v-model的绑定值)
  }
  if (dir.arg) {
    if (!dir.exp) {
      dirArgs.push('void 0');
    }
    dirArgs.push(dir.arg);
  }
  if (Object.keys(dir.modifiers).length) {
    if (!dir.arg) {
      if (!dir.exp) {
        dirArgs.push('void 0');
      }
      dirArgs.push('void 0');
    }
    const trueExpression = createSimpleExpression('true', false, loc);
    //如果有修饰符则将其置为true如trim=true,number=true
    dirArgs.push(
      createObjectExpression(
        dir.modifiers.map((modifier) => createObjectProperty(modifier, trueExpression)),
        loc,
      ),
    );
  }
  return createArrayExpression(dirArgs, dir.loc);
}

```

经过buildDirectiveArgs处理后变为，最后一个元素为修饰符(如果添加了修饰符)

<img src="/Users/guobin/Desktop/3.png" alt="image-20230816095218321" style="zoom:50%;" />

在createVNodeCall的时候会判断buildDirectiveArgs返回值后处理的长度，如果不为0则需要WITH_DIRECTIVES包裹，在生成code的时候会判断如果directives的长度不为0则需要withDirectives包裹。withDirectives的实现如下

```javascript
export function withDirectives(vnode, directives) {
  // console.log(directives)
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir,
        };
      }
      if (dir.deep) {
        
      }
      bindings.push({
        dir,
        instance: {},
        value,
        oldValue: void 0,
        arg,
        modifiers,
      });
    }
  }
  return vnode;
}
```

这里的操作其实就是在vnode上添加dir属性，包括指令的arg,value,modifiers等，directives[i]的第0项就是指令的实现方式，包括指令的生命周期，在当前例子中就是vText在created,mounted等不同阶段的实现方式，buildDirectiveArgs处理后的结果的第一项就是指令的实现方式，具体在文件夹runtime-dom/src/directives/vModel下，以vText的实现方式为例

```javascript
export const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);//在例子中的值为$event => ((foo) = $event)
    //el._assign是一个函数
    
    const castToNumber = number || (vnode.props && vnode.props.type === 'number');
    addEventListener(el, lazy ? 'change' : 'input', (e) => {
      let domValue = el.value;
      if (trim) {//去除空格
        domValue = domValue.trim();
      }
      if (castToNumber) {//强制转为number
        domValue = looseToNumber(domValue);
      }
      el._assign(domValue);//当用户输入时，将用户的输入传入($event)=>{ foo=$event },复制给用户绑定的v-model的值
    });

    if (trim) {
      addEventListener(el, 'change', () => {
        el.value = el.value.trim();
      });
    }
  },
  mounted(el, { value }) {
    el.value = value == null ? '' : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {//dom更新时将最新值传递给input的el.value
    el._assign = getModelAssigner(vnode)//更新
    const newValue = value === null ? '' : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  },
};

const getModelAssigner = (vnode) => {
  const fn = vnode.props['onUpdate:modelValue'];
  return isArray(fn) ? (value) => invokArrayFns(fn, value) : fn;
};
export const invokArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
```

经过以上的处理之后，就可以实现双向绑定了。指令的生命周期的调用在runtime-core的renderer中的mountElement / patchElement下，这里就不介绍了，大家可以去阅读相关源码。

> 本文中对于相关代码的实现都是从源码中提取得出，减去了一些错误处理，环境判断相关代码，完整代码请阅读源码，我也是第一次学习源码，还望多多指正。