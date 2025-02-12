class Person{
  constructor(name){
    this.name = name;
    this.address={
      name:"北京"
    }
  }
}
class Student extends Person{
  constructor(age,name){
    super(name);
    this.age = age;
  }
}
let stu = new Student(14,"李娜");
console.log(stu)