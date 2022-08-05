function Student(name,age){
  this.name=name;
  this.age=age;
}
function Teacher(){

}
let teacher=Reflect.construct(Student,['gb','18'],Teacher);
console.log(teacher);