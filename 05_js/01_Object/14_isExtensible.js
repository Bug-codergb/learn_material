let obj={
  name:"哈哈哈"
}
Object.preventExtensions(obj);
console.log(Object.isExtensible(obj));