class Depend{
  constructor(){
    this.reactive=[];
  }
  addDepend(fn){
    this.reactive.push(fn);
  }
  notify(){
    this.reactive.forEach(fn=>{
      fn();
    })
  }
}
let depend=new Depend();

let activeReactiveFn=null;
function watchFn(fn){
  activeReactiveFn=fn;
  fn();
  activeReactiveFn=null;
}

let objMap=new WeakMap();
function getDepend(target,key){
  let map=objMap.get(target);
  if(!map){
    map=new Map();
    objMap.set(target,map);
  }
  let depend=map.get(key);
  if(!depend){
    depend=new Depend();
    map.set(key,depend)
  }
  return depend;
}
let obj={
  name:"李彦宏",
  age:48,
  address:{
    name:"23"
  }
}
let proxy=new Proxy(obj,{
  get(target,key,reciver){
    let depend=getDepend(target,key);
    depend.addDepend(activeReactiveFn)
    return Reflect.get(target,key,reciver);
  },
  set(target,key,newVal,reciver){
    Reflect.set(target,key,newVal,reciver);
    let depend=getDepend(target,key);
    depend.notify();
  }
})
watchFn(function(){
  console.log(proxy.name);
})
watchFn(function(){
  console.log(proxy.age);
})
watchFn(function(){
  console.log(proxy.address);
})
proxy.address.name="北京"