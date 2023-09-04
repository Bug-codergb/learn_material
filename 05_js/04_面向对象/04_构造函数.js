"use strict"
function person(name, age) {
  this.name = name;
  this.age = age;
}
let obj = {};
person.call(obj, "gblina", 10);
console.log(obj);
eval("console.log(12)")