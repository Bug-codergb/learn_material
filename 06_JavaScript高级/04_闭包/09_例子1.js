var n = 999;

function f1(){
  var n = 1000;
  function f2(){
    console.log(n);
  }
  return f2
}

function f3(p){
  var n = 1001;
  p();
}

f3(f1());
/**
 * 首先分析f1的执行
 * f1执行时会返回f2，在f2中访问了n,所以n也会被返回出来，里边通过var定义了一个n则不会访问var n=999;
 * 执行f3,此时执行p，但是闭包是在函数定义时生成的所以n不会是1001;而是1000
 */