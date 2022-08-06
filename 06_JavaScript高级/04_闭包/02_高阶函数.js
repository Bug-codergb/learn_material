let arr=[2,3,1,4,5];
arr.forEach((item,index)=>{
  if(item===1){
    return;
  }
  console.log(item)
})
console.log("------------------------");
const newArr=arr.filter((item,index)=>{
  if(item===3){
    return;
  }
  console.log(item);
})
console.log(newArr)