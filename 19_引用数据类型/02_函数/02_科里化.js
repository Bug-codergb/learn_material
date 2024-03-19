function foo(a, b, c) {
  return a + b + c;
}
function app(a) {
  let sum = 0;
  sum += a;
  return (b) => {
    sum += b;
    return (c) => {
      sum += c;
      return sum;
    }
  }
}
console.log(app(1)(2)(3))