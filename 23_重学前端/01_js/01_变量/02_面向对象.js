/**
 * 1. 声明一个非箭头函数，不管该函数是否为构造函数，他都会存在一个prototype属性，默认情况下会有一个constructor属性
 *    {constructor:Person(){}}，constructor指向它自己
 * 2. 自定义new的时候则不需要自己指定constructor,因为它默认存在于Person构造函数之上
 * 3. 构造函数内部创建的对象会存在一个__proto__属性，他会指向构造函数的prototype
 */
function Person(name) {
  console.log(this);
  this.name = name;
  return undefined
}
let p1 = new Person("app")
console.log(p1)
console.log(Person.prototype)//{constructor:Person}
//let p = new Person("coder");//在构造函数内部返回一个对象，会导致构造函数的new失效, 返回原始值则不妨碍
//console.log(p)


// console.log({}.constructor)// 默认对象的构造函数为 Object

/*function myNew(fn,...args) {
  let obj = {};
  Object.setPrototypeOf(obj, fn.prototype);
  let result = fn.apply(obj, args);
  return result instanceof Object ? result : obj;
}*/
function create(fn, ...args) {
  let obj = {};
  let Constructor = fn;
  obj.__proto__ = Constructor.prototype;
  const ret = Constructor.apply(obj, args);
  return typeof ret === 'object' ? ret : obj;
}
let p = create(Person, "lina");
console.log(p)