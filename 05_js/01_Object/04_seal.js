/**
 * 封闭一个对象
 * 1. 不可删除
 * 2. 可以修改
 * 3. 不可添加
 */
let obj={
  name:"123",
  age:45
}
Object.seal(obj);
obj.address="北京";
delete name;
obj.age=90;
delete obj.age
obj.a=45;
console.log(obj);