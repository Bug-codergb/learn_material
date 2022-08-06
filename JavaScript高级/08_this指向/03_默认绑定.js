function foo1(){
  console.log(this);
  foo2();
}
function foo2(){
  console.log(this);
  foo3();
}
function foo3(){
  console.log(this);
}
foo1();
foo1.apply({});

let obj={
  name:"哈哈哈",
  bar:()=>{
    console.log(this)
  }
}
obj.bar();//window
