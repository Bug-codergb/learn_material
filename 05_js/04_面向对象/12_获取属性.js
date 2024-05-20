let id = Symbol("id");
function Person() {
  this.alias = "app";
  this.name = "foo"
  this[id] = "1001"
}
Person.prototype.say = function () {}
let symbol = Symbol("s");
Person.prototype[symbol] = "APP_INFO"
let p = new Person();
console.log("实例",p)
//只能获取实例上的属性
console.log('--Object.keys--',Object.keys(p))//无法获取symbol
console.log('--Object.getOwnPropertyNames--',Object.getOwnPropertyNames(p))//无法获取symbol
console.log("--Reflect.ownKeys--", Reflect.ownKeys(p))//普通属性和symbol
console.log("--Object.entries--", Object.entries(p));//二维数组，无法获取symbol
//既能获取实例上的属性也能获取原型上的属性
for (const key in p) {//无法获取symbol
  console.log(key)
}