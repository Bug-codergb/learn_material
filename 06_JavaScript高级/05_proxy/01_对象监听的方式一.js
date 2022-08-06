let obj={
  name:"gb",
  age:18
}
Object.keys(obj).forEach(key=>{
  let value=obj[key];
  Object.defineProperty(obj,key,{
    get(){
     console.log(`获取${key}`) 
     return value
    },
    set(newVal){
      value=newVal;//疑问
    }
  })
})
console.log(obj.name);
obj.name="bug";
console.log(obj.name);