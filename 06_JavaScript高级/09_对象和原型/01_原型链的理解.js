let obj = {
  name: "codergb",
  age:13
}
obj.__proto__ = {
  
}
obj.__proto__.__proto__={

}
obj.__proto__.__proto__.__proto__ = {
  address:"北京市"
}
//会在obj的__proto__一直查找下去
console.log(obj.address);
function Person() {
  
}
const p = new Person();
console.log(p.__proto__, Person.prototype);
console.log(p.__proto__===Person.prototype)