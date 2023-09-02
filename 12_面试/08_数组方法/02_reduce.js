Array.prototype.myReduce = function (fn,init) {
  let prev = init !== undefined ? init : this[0];
  let startIndex = init ? 0 : 1;
  for (let i = startIndex; i < this.length; i++){
    prev = fn(prev, this[i], i, this);;
  }
  return prev;
}
let arr = [
  {
    count:12,
  },  
  {
    count:13
  },
  {
    count:14
  },
]
const sum = [2,3,1].myReduce((prev, cur, index, arr) => {
  console.log(prev,cur)
  return prev + cur;
})
console.log(sum)