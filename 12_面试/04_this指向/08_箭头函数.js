function foo() {
  console.log(this);
  let obj = {
    fn:()=> {
      console.log(this);
    }
  }
  return obj;
}
const app = foo.apply({ name: "aoa" });
app.fn.apply({ opop: "dsd" });

const foo1 = () => {
  console.log(this);
}
foo1.apply({name:"ssw"})