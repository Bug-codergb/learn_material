/*
  将一个Map转化为object
  
*/
let m=new Map([
  [
   "name","哈哈哈" 
  ]
])
console.log(m.get("name"));
let obj=Object.fromEntries(m);
console.log(obj)