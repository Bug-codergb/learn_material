function foo() {
  let obj = {
    app:1
  }
  return {
    name: "coder",
    obj
  }
}
const obj1 = foo();
obj1.obj.app++;
console.log(obj1)
const obj2 = foo();
console.log(obj2)