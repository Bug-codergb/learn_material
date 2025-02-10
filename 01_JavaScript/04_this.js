const foo=()=>{
  console.log(this.a);
}
const fn = foo.bind({a:123});
fn()