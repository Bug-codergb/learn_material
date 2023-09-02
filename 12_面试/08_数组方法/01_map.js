Array.prototype.myMap = function (fn) {
  const arr = this;
  let res=[]
  for (let i = 0; i < arr.length; i++){
    res.push(fn(arr[i],i,arr));
  }
  return res;
}
const res = [1, 2, 3, 4, 5, 6].myMap((item, index, arr) => {
  return item * 3;
})
console.log(res);