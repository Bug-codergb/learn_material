function Person(name='default'){
  this.name = name;//基本数据类型
  this.address={//引用数据类型
    name:"北京"
  }
}
Student.prototype = new Person();
function Student(age){
  this.age = age;
}
//e1
let stu1 = new Student(18);
stu1.name = "lina"
stu1.address.name="上海"
console.log(stu1);
//e2
let stu2 = new Student(20);
console.log(stu2)
/**
 * 1. 原型链继承 无法为父类传递参数
 *   // 2. 无法修改原型上的属性，只能添加到实例上面
 * 3. 多个实例共享一个原型（再次new一个实例，address.name已经被修改）
 */