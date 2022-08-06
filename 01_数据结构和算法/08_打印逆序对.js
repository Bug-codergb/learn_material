function merge(arr,start,end){
  if(start===end){
    return [];
  }else{
    let mid=start+Math.floor((end-start)>>1);
    merge(arr,start,mid);
    merge(arr,mid+1,end);
    mergeHandle(arr,start,mid,end);
  }
}
function mergeHandle(arr,start,mid,end){
  let i=start,n=mid;
  let j=mid+1,m=end;
  let res=[];
  while(i<=n&&j<=m ){
    if(arr[i]<arr[j]){
      res.push(arr[i]);
      i++;
    }else if(arr[i]>arr[j]){
      for(let k=i;k<=mid;k++){
        console.log(`(${arr[k]},${arr[j]})`);
      }
      res.push(arr[j]);
      j++;
    }else{
      res.push(arr[i]);
      res.push(arr[j]);
      i++;
      j++;
    }
  }
  while(i<=n){
    res.push(arr[i]);
    i++;
  }
  while(j<=m){
    res.push(arr[j]);
    j++;
  }
  for(let i=0;i<res.length;i++){
    arr[start+i]=res[i];//从start开始
  }
}
function print(arr){
  if(arr===null ||arr.length<2){
    return []
  }else{
    merge(arr,0,arr.length-1);
  }
}
const arr=[3,4,1,2,8,7,6];
console.log(print(arr));