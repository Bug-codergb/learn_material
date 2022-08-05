main(){
  var p=new Person("coder");
}
class Person{
  final String name;
  final int age;
  Person(this.name,{int age=""}): this.age=age??10{

  }
}