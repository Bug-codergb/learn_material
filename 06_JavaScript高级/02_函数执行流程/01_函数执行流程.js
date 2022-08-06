var message="hello message";
function foo(){
  console.log(message)//"hello message"
}

function bar(){
  var message="hello bar";
  foo();
}
bar()