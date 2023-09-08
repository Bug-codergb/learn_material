function Person() {
  this.name = "gblina";
  this.age = 10;
  this.arr = [];
}
function Student() {
  this.address = "济南";
}
Student.prototype = new Person();
let stu1 = new Student();
let stu2 = new Student();
stu1.name = "lina";
stu1.arr.push(1)
console.log(stu2.name, stu2.arr)
console.log(stu1)