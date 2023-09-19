class Person{
  private name:string;
  constructor(name:string) {
    this.name= name;
  }
  eating(){
    console.log("eating");
  }
}
class Animal{
  private age:number;
  constructor(age:number) {
    this.age = age;
  }
}
class Student extends Person{//ts类不支持多继承

}
interface IProps{
  name:string
}
interface IDate{
  age:number
}
//借口支持多继承
interface IMethods extends IProps,IDate{

}
let name:IMethods={
  name:"12",
  age:12
}

export{}
