/*
  将对象设置为不可扩展 不可添加新属性
  1. 可以删除
  2. 不可添加
  3. 可以修改
*/

let obj={
  name:"哈哈哈",
  age:12,
  address:"北京超这样"
}
Object.preventExtensions(obj);
delete obj.address;
obj.a="哈哈哈"
obj.age="唐山"
console.log(obj);