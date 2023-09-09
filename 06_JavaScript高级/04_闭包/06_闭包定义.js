/**
 * 闭包是一个函数以其捆绑的周边环境状态的引用的组合。闭包让开发者可以从内部函数访问外部函数的作用域
 * 闭包会随着函数的创建而同时被创建
 */
//来自mdn的一个例子
function makeAdder(x) {
  return function (y) {
    return x + y;
  }
}
var add5 = makeAdder(5);//这个函数的x=5变量都不会被销毁
var add10 = makeAdder(10);//这个函数x=10变量不会被销毁
//来自vue3源码工具函数
const cacheStringFunction = (fn) => {
  const cache = Object.create(null);//这里的cache就可以缓存所有函数以及函数的处理结果
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }
}
const capitalize = cacheStringFunction((str) => {
  str.charAt(0).toUpperCase();
})
//用函数模拟私有变量
const Count = (() => {
  let a = 10;
  const changeA = (arg) => {
    a = arg;
  }
  return {
    increment: () => {
      a++;
      changeA(a);
    },
    decrement: () => {
      a--;
      changeA(a);
    },
    value: () => {
      return a;
    }
  }
})()
console.log(Count.value());
Count.increment();
Count.increment();
console.log(Count.value());