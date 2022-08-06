class Depend{
  constructor(){
    this.reactiveFn=[]
  }
  addDepend(fn){
    this.reactiveFn.push(fn);
  }
  notify(){
    this.reactiveFn.forEach((fn)=>{
      fn();
    })
  }
}
obj={
  name:"哈哈",
  age:45
}
let depend=new Depend();
function watchFn(fn){
  depend.addDepend(fn);
}
watchFn(function(){
  console.log(obj.name)
})
depend.notify();