const arr = ["app", "web", "flutter", "rn", "js"];
const s = arr.slice(-1);//负数是从数组的倒数第n个数开始
console.log(s);
console.log(arr.slice(-1, -3))//[]
console.log(arr.slice(-3, -1));//[flutter,rn]
console.log(arr.slice(1,2))//它是不包含结尾的