Person.prototype.getName=function(){
  console.log("getName");
}
function Person(name='default'){
  this.name = name;//基本数据类型
  this.address={//引用数据类型
    name:"北京"
  }
}

Student.prototype = new Person();
Student.prototype.constructor = Student;

function Student(name,age){
  Person.call(this,name);
  this.age = age;
}
//e1
let stu1 = new Student("gb",18);
stu1.address.name="上海"
console.log(stu1);
//e2
let stu2 = new Student("ln",20);
console.log(stu2)
/**
 * 1. 较为完美，父类调用2次
 */