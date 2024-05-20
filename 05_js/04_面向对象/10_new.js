function OneNew() {
  this.name = "qoo"
}
function TwoNew() {
  this.name = "fpp"
  return {}//如果返回的是对象，则返回这个对象，否则
}
let p1 = new OneNew();
let p2 = new TwoNew();
console.log(p1);
console.log(p2);


function myNew(fn,...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  const ret = fn.apply(obj,args);
  return typeof ret === "object" ? ret : obj
}
function fn(name,age) {
  this.name = name;
  this.age = age;
}
let p3 = myNew(fn,"coder",34);
console.log(p3)
