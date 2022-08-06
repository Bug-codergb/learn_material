function Person(){
  this.name="哈哈哈",
  this.age=89
}
Person.prototype.address="哈哈哈";
Person.prototype.asy=()=>{
  console.log("呵呵呵")
};
let p=new Person();
console.log(Object.getPrototypeOf(p))