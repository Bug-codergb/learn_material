function Person(name,age) {
  this.name = name;
  this.age = age;
}

// console.log(Object.getPrototypeOf(p));
// let obj = {
//   name:"gblina"
// }
// console.log(Object.getPrototypeOf(obj));

// let g = Object.create(null);
// console.log(Object.getPrototypeOf(g))
Person.prototype.eat = function () {
  console.log("eat");
}
let p1 = new Person("gblina", 12);
let p2 = new Person("lina", 23);
console.log(p1.eat === p2.eat);