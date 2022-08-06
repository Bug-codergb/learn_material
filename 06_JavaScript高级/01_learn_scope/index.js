function foo(){
  function bar(){
    var b=23;  
  }
  bar();
}
foo();
console.log(window)