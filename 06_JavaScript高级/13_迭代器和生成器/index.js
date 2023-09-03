// let arr = [9, 8, 7, 6, 5, 4];

// const _iterator = arr[Symbol.iterator]();;
// console.log(_iterator.next());
// console.log(_iterator.next());
// console.log({})
// let obj = {
//   a:"232"
// }
// console.log(Boolean(false).valueOf());


//迭代对象
let obj = {
  name: "gb",
  age: 12,
  address: "China",
  [Symbol.iterator]:function() {
    let index = 0;
    const entries = Object.entries(this);
    const iterator = {
      next:  function() {
        if (index < entries.length) {
          return {
            value: entries[index++],
            done:false,
          }
        } else {
          return {
            value: undefined,
            done:true
          }
        }
      }
    }
    return iterator;
  }
}
for (let item of obj) {
  console.log(item);
}
