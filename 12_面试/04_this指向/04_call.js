let obj = {
  name:"appap"
}
function fn() {
  console.log(this);
}
function app() { };
fn.apply(obj);
fn.apply(undefined);//window
fn.apply(null);//window
fn.apply(NaN);
fn.apply(1);
fn.apply("1");
fn.apply();//window
fn.apply(app);//就是app函数
fn.apply(Symbol("1"))