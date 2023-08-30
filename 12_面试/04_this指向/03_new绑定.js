/*
  new 所做的事情
  1. 创建一个空的对象
  2. 将this指向这个空对象
  3. 执行函数体中的代码
  4. 默认返回这个空对象 
*/
function _new(fn,...args) {
  let obj = new Object();
  obj.__proto__ = Object.create(fn.prototype);
  const res = fn.apply(obj,args);
  return res
}
function foo(name) {
  //console.log(this);
  this.name = name;
}
let p = _new(foo, "aaa");


function foo2() {
  console.log(this);
}
let fn = foo2.bind({ name: "foo" });
//fn()
new fn();