let url = "https://localhost:8989?name=foo&age=45&gender=male";
let exp = /[\w]+=[\w]+/g;
const res = url.match(exp);
let arr = [];
if (res && res.length !== 0) {
  let exp = /\w+/g;
  for (let item of res) {
    let obj = {};
    const expRes = item.match(exp);
    if (expRes) {
      obj.key = expRes[0]??"";
      obj.value = expRes[1]??"";
    }
    arr.push(obj);
  }
}
console.log(arr);