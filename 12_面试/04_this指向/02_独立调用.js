function foo(fn) {
  fn();//只要是独立调用就是window
}
let obj = {
  fn() {
    console.log(this);
  }
}
foo(obj.fn);