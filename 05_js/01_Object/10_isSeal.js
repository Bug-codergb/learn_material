/**
 * 
 * 对象是否被封闭
 */
function Person(){
  this.name="哈哈哈",
  this.age=45
}
let p=new Person();
Object.seal(p);
console.log(Object.isSealed(p));