function maxNum(arr){
  return Math.max(before(arr,0,arr.length-1),after(arr,0,arr.length-1))
}
function before(arr,l,r){
  if(l===r){
    return arr[l];
  }else{
    let p1=arr[l]+after(arr,l+1,r);
    let p2=arr[r]+after(arr,l,r-1);
    return Math.max(p1,p2);
  }
}
function after(arr,l,r){
  if(l===r){
    return 0;
  }else{
    let p1=before(arr,l+1,r);
    let p2=before(arr,l,r-1);
    return Math.min(p1,p2);
  }
}
const arr=[100,1000,2,5000]
console.log(maxNum(arr))