let obj = {
  name: undefined,
  age: null,
  alias: "12",
  address: Symbol("v-fmt"),
  num: NaN,
  time: new Date(),
  map: new Map([
    ["a","b"]
  ]),
  set:new Set([1,2,3,4])
}
console.log(obj);
console.log(JSON.parse(JSON.stringify(obj)))
/**
 * JSON.stringify相关方法实现深拷贝的缺点
 * 1. undefined的相关属性会丢失
 * 2. symbol相关的属性会丢失
 * 3. NaN会变为null,
 * 4. 日期会变为字符串类型
 * 5. set,map直接丢失元素 
 */