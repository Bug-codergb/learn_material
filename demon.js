function getDiff(arr,target) {
  let map = new Map();
  let len = arr.length;
  for (let i = 0; i < len; i++){
    if (map.get(target +arr[i])) {
      return [map.get(target+arr[i]),i]
    }
    map.set(arr[i], i);
  }
}
let arr = [7, 2, 6, 9, 4, 5, 2], target = 3;
console.log(getDiff(arr,target))