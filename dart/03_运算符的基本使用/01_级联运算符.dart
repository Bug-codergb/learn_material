class Person{
  String name="";
  int age=112;
  Person(String name,int age){
    this.name=name;
    this.age=age;
  }
  void sayName(){
    print(this.name);
  }
  void sayAge(){
    print(this.age);
  }
}
main(){
  Person p=new Person("那么",78)
           ..sayAge()
           ..sayName();
}