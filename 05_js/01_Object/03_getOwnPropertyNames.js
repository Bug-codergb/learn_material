class Person{
  constructor(){
    this.name="哈哈哈",
    this.age="呵呵呵"
  }
  create(){
    console.log("我出现了")
  }
}
let p=new Person();
console.log(Object.getOwnPropertyNames(p));