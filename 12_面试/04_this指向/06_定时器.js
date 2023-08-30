function foo() {
  console.log(this);
}
let obj = {};
const app = foo.bind({});
setTimeout(app);
window.app = app;
window.app();

let bar = {
  fn:app
}
bar.fn();