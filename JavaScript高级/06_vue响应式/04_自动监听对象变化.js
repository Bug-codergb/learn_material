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
let proxy=new Proxy(obj,{
  get(target,key,reciver){
    return Reflect.get(target,key,reciver);
  },
  set(target,key,newVal,reciver){
    Reflect.set(target,key,newVal,reciver);
    depend.notify();
  }
})
watchFn(function(){
  console.log("监听到变化")
  console.log(proxy.name);
})
proxy.name="呵呵"