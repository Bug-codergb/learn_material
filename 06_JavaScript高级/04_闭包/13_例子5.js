var n = 10;
function f1(){
  var n = 20;
  function f2(){
    n++
    console.log(n);
  }
  f2();
  return f2
}

var result = f1();//执行f1,执行f2 21，f1执行后，f2执行，n为21 ，
result();//22
result();//23
console.log(n);//10