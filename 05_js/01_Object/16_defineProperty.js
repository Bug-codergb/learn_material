let obj={
  name:"哈哈哈"
}
Object.defineProperty(obj,"age",{
  writable:true,
  enumerable:true,
  configurable:true,
})
console.log(obj);