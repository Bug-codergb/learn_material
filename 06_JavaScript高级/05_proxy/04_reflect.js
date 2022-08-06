let obj={
  name:"哈哈",
  age:13
}
let proxy=new Proxy(obj,{
  get(target,key){
    return Reflect.get(target,key);
  },
  set(target,key,newValue){
    Reflect.set(target,key,newValue);
  },
  has(target,key){
    console.log(`查看${key}是否在target`)
    return Reflect.has(target,key);
  },
  deleteProperty(target,key){
    console.log(`删除${key}`)
    Reflect.deleteProperty(target,key);
  }
})
console.log(proxy.name);
proxy.name="你好";
console.log(proxy.name);
console.log('name' in proxy);
delete proxy.age