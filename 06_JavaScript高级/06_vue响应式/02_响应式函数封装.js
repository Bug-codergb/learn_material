let obj={
  name:"哈哈",
  age:45
}
function fnDemo(){
  console.log('fnDemo--'+obj.name);
  console.log('fnDemo--'+obj.age);
}
function demoFn(){
  let newName=obj.name+'ff';
  console.log('demoFn--'+newName)
}
let reactive=[];
function watchFn(fn){
  reactive.push(fn);
}
watchFn(fnDemo);
watchFn(demoFn);
reactive.forEach((fn)=>{
  fn();
})