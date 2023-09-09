async function foo() {
  console.log("foo");
  await bar();
}
async function bar() {
  console.log("bar");
  await fn();
  console.log("fn end")
}
async function fn() {
  console.log("fn");
}
foo();