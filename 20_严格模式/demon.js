/*
paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
banned = ["hit"]
  输出: "ball"
*/
function test(paragraph,banned) {
  if (!paragraph) {
    return "";
  }
  let exp = /[^\w]/g;
  const newParagraph = paragraph.replace(exp, " ");
  let arr = newParagraph.split(" ");
  arr = arr.filter((item) => {
    return item && item.trim().length !== 0;
  })

  for (let i = 0; i < arr.length; i++){
    arr[i] = arr[i].toLocaleLowerCase();
  }
  let map = new Map();
  for (let item of arr) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  let maxCount = 0;
  let res=""
  map.forEach((value, key) => {
    if (value > maxCount && !banned.includes(key)) {
      maxCount = value;
      res = key;
    }
  })
  return res;
}
let paragraph = "Bob hit a ball, a a a the hit BALL; flew far after it was hit.";
let banned = ["hit","a"];
console.log(test(paragraph, banned));
