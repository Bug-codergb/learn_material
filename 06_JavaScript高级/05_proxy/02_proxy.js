//proxy是一个类
let obj={
  name:"gb",
  age:18,
  height:1.88,
  address:{
    name:"北京"
  }
}
let proxy=new Proxy(obj,{
  get(target,key){
    console.log(`获取${key}`);
    return target[key];
  },
  set(target,key,newVal){
    console.log(`设置${key}为${newVal}`)
    target[key]=newVal;
  },
  has(target,key){
    return key in target
  },
  deleteProperty(target,key){
    console.log(`删除${key}`)
    delete target[key];
  }
})
//get
console.log(proxy.name)
//set
proxy.age=30;
console.log(proxy.age)
//has
console.log("age" in proxy);
delete proxy.height;
console.log(Object.getOwnPropertyNames(obj))