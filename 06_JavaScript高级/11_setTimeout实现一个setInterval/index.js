function _setInterval(fn, time) {
  let timer = setTimeout(()=> {
    fn();
    timer = _setInterval(fn, time);
  }, time);
  return timer;
}
let count=0
let a = _setInterval(() => {
  console.log(count++);
}, 1000)
clearTimeout(a)
