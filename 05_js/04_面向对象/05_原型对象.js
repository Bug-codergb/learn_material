class Person{
  constructor() {
    this.name = "name";
  }
}
class Student extends Person{
  constructor() {
    super("lina");
    this.age = 10;
  }
}
let stu = new Student(12);
console.log(stu);