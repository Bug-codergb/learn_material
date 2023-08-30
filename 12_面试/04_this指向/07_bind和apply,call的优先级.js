function foo() {
  console.log(this);
}
const fn = foo.bind({op:"op"},);
fn.apply({ name: "apap" });
fn.call({ name: "apap" });