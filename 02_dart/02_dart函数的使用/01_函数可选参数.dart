main(){
  String foo(int age,[String name="哈哈哈",double height=1.2]){
    return "$age+$name+$height";
  }
  print(foo(12));
  String bar(bool flag,{String name="1",double height=11.2}){
    return "$flag+$name+$height";
  }
  print(bar(false,name:"nono",height: 1.99));
}