function Person() {
  this.name = "coder"
}
Person.prototype.count = {num:0};//这个对象会被共享
let p1 = new Person();
p1.count.num = 12;
let p2 = new Person();
console.log(p2.count);

function Animal() {
  this.name = "cat"
}
Animal.prototype = {
  count: 0,
  friend: {
    name:"dog"
  }
}
let a1 = new Animal();
a1.count = 12;
a1.friend.name = "mouse";
let a2 = new Animal();
console.log(a2.count)
console.log(a2.friend.name)
// delete 只能删除对象实例上的属性，不可以删除原型上的属性

/**
 * 
 * 重写原型 记得赋值 constructor
 */
function Student() { };
Student.prototype = {
  name: "哈哈哈",
  age: 12,
  constructor:Student/*constructor是不可以被枚举的，
                        所以需要实用
                        Object.deinfeProperty(Stuent.prototype,"constructor",{enumerable})*/
}