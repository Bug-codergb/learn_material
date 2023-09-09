Function.prototype.gbCall = function (thisArg,...rest) {
  let fn = this;
  thisArg = thisArg ? Object(thisArg) : window;
  thisArg.fn = fn;
  let res = thisArg.fn(...rest);
  delete thisArg.fn;
  return res;
}
let obj = { name: "12" };
function foo(a,b) {
  console.log(this);
  return a + b;
}
let res = foo.gbCall(12, 1, 2);
console.log(res);