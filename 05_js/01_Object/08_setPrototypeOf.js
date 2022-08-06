let obj={
  name:"哈哈哈",
  age:45
}
let prototype={
  address:"北京市"
}
Object.setPrototypeOf(obj,prototype);
console.log(obj)