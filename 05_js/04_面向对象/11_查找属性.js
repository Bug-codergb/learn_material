function Person() {
  this.alias = "app"
}
Person.prototype.say = function () {
  
}
let symbol = Symbol("s");
Person.prototype[symbol] = "APP_INFO"
let p = new Person();
console.log(p.hasOwnProperty("alias"), p.hasOwnProperty("say"));
console.log("alias" in p, "say" in p)
console.log("toString" in p)
console.log(symbol in p)
//getOwnPropertyDescriptor只能获取实例上的