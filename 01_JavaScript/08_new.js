function _new(fn,...rest){
  let obj={};
  Object.setPrototypeOf(obj,fn.prototype);
  let ret = fn.apply(obj,rest);
  return typeof ret === 'object' ? ret : obj;
}

function Person(age){
  this.age = age
}
let p = new Person();
console.log(p);

let p1 = _new(Person,18);
console.log(p1)