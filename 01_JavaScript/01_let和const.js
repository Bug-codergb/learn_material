console.log("<<<<< e1")
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10 变量i是var命令声明的，在全局范围内都有效

console.log("<<<<< e2")
var g = "hello";
function showGlobal(){
  console.log(g);
}
g="hi";
showGlobal()
console.log("<<<<<<<e3")
let b = "thank";
function showBlock(){
  console.log(b);
}
b = "how do you do";
showBlock()
console.log("<<<<<< e4");

for(let i=0,arr=[1,2,3,4,5,6];i<arr.length;i++){
  console.log("exec",i);
  arr.pop()
}
console.log("<<<<< e5")
var c = true;
function foo(){
  console.log(c);
  let c = false;
}
//foo()
console.log("<<<< e6")
console.log(typeof x)
console.log("<<<<<< e7")
function f1() {
  let n = 5;
  if (true) {
    let n = 10;//n再次声明，不影响上级作用域
  }
  console.log(n); // 5
}
console.log("<<<<<<< e8");
let template = "template";
(function(){
  var temp = "global"
  template = "globalTHos"
  console.log("立即执行函数")
}())
//console.log(temp);//报错
console.log(template)
///const 指向的内存地址保存的数据不可变，