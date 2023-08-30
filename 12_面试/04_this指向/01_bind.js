let obj = {
  fn:()=>{
    console.log(this)
  },
  app() {
    console.log(this);
  }
}
obj.fn();
obj.app();

obj.app.bind(null)();//null就是window
obj.app.bind({})();//是{}
obj.app.bind(undefined)();
obj.app.bind(NaN)();
console.log("------obj--------");

function foo(name,height,age,address){
  console.log(this);
  console.log(name, height,age, address);
}
let object = { oop: "oop" };
const fn = foo.bind(object, "lina", 10, 26);
fn("jinin");//这里传的参数只会添加之bind参数的最后面，不会覆盖参数