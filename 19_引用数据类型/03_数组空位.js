let arr=[,,,,,];
console.log(arr.length);
arr.map((item,index)=>{
  console.log(item);
  console.log(index);
})
for(let item of arr){
  console.log(item);
}
arr.forEach((item,index)=>{
  console.log(item,index);
})
const s = [
  {
    name:"gb"
  },
  {
    name:"lina"
  }
]
s.forEach((item,index)=>{
  item.name="foo"
})
console.log(s);
s.map((item,index)=>{
  item.name="李娜"
})
console.log(s);
