function getArrayMax(arr,start,end){
  if(start===end){
    return arr[start];
  }
  const mid=start+Math.floor((end-start)>>1);
  const startMax=getArrayMax(arr,start,mid);
  const endMax=getArrayMax(arr,mid+1,end);
  return Math.max(startMax,endMax);
}
const arr=[3,4,1,34,6,7,8,12,34];
console.log(getArrayMax(arr,0,arr.length-1));