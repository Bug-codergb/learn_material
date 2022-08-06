function foo(){
  var message=78;
  function demo(arg){
    console.log("demo",message)
  }
  return demo;
}
var fn=foo();
fn("哈哈哈");
console.log(message)