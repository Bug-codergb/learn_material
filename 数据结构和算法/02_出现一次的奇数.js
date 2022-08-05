function oneOddCount(arr){
  let res=0;
  for(let item of arr){
    res=res^item;
  }
  return res;
}
let arr=[99,2,4,4,6,2,6,10,14,14,10];
console.log(oneOddCount(arr));