//"use the strict"
/**
 * 访问器属性
 * 数据属性
 * 
 */
let obj = {};
Object.defineProperty(obj, "name", {
  configurable: false,
  enumerable: true,
  // value: 12,
  //writable: true,//属性是否可以被修改
  get() {
    return 12
  },
  set(newVal) {
    console.log(newVal)
  }
})
//delete obj.name;//如果configurable 设置为false 严格模式下会报错
console.log(Object.getOwnPropertyDescriptors(obj))
console.log(Object.getOwnPropertyDescriptor(obj,"name"))
