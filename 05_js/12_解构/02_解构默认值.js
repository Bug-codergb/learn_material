let a = { name: "foo", age: 19 ,alias:undefined,address:null};
function foo() {
  const { name = "app", alias = "guobin",address = "北京" } = a;
  //alias 必须严格等于undefined
  console.log(name,alias,address); 
}
foo();


function f() {
  console.log('aaa');
}

let [x = f()] = [1];//x可以取到值，所有f不会执行
console.log(x)