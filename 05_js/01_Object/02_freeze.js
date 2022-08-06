let obj={
  name:"hello",
  age:78
}
Object.freeze(obj);
obj.name="你是";
delete obj.age
obj.address="背景"
console.log(obj)