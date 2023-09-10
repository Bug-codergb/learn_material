function App() {
  
}
App.prototype.a = "a";
let b = new App();
App.prototype = {
  name: "1",
  age:12
}
console.log(b.a);