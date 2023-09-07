let fmt = Symbol.for("fmt");
function Person(name, age) {
  this.name = name;
  this.age = age;
  this[fmt] = "app";
  this.fn=()=>{}
}
Person.prototype.address = "北京";
Person.prototype.eat = function () {
  console.log("eatting")
}
let p = new Person("coder", 12);
console.log(p);
//1. for...in
for (const key in p) {//会遍历到原型上的属性和方法
  console.log(key);
}
// 2. Object.keys
const keys = Object.keys(p);
console.log(keys);//不可以遍历到原型上的属性和方法
// 3。Reflect.ownKeys;
const ownKeys = Reflect.ownKeys(p);
console.log(ownKeys);//同样遍历不到原型上的属性和方法,可以获取symbol类型

const properties = Object.getOwnPropertyNames(p);
console.log(properties);//同样无法获取原型上的属性和方法

// console.log(p.hasOwnProperty("name"));
// console.log(p.hasOwnProperty("address"));
// console.log("name" in p);
// console.log("address" in p);

// console.log(Object.getOwnPropertySymbols(p))
const entries = Object.entries(p);
console.log(entries)
console.log(Object.getOwnPropertyDescriptors(p));