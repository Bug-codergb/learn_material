function foo() {
  return () => {
    console.log(this);
  }
}
let obj = {
  foo,
  name:"app"
};
obj.foo()();