class Depend{
  constructor(){
    this.reactive=[];
  }
  addDepend(fn){
   this.reactive.push(fn);
  }
  notify(){
    this.reactive.forEach((fn)=>{
      fn();
    })
  }
}
let obj={
  name:"哈哈"
}
let depend=new Depend();
function watchFn(fn){
  depend.addDepend(fn);
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
    map.set(key,depend);
  }
  return depend;
}

let proxy=new Proxy(obj,{
  get(target,key){
    return Reflect.get(target,key);
  },
  set(target,key,newVal){
    Reflect.set(target,key,newVal);
    depend.notify();
  }
})
watchFn(function(){
  console.log(proxy.name)
})
proxy.name="123";