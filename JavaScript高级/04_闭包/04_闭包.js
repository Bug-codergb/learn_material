var message="12"
function bax(){
  var message="hello";
  function foo(){
    console.log(message);
  }
  function bar(){
    message="cococ";//上一级作用域
    foo();
  }
  bar()
}
console.log(message)
bax();