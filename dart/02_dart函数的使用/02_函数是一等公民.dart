 typedef Cacle=int Function(int a,int b);
main(){
  foo(Function bar){
   bar();
  }
  foo((){
    print("我是函数");
  });

  int sum(Cacle cacle){
    return cacle(1,2);
  }
  int res=sum((num1,num2){
    return num1+num2;
  });
  print(res);
}