class Person{
  final String name;
  const Person(this.name);
}
main(){
  var a=123;
  print(a);
  const p=Person("kobei");
  const pp=const Person("anme");
  print(p.name);
  print(identical(p, pp));
}