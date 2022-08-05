function merge(arr,start,end){
  if(start===end){
    return 0;
  }else{
    let mid=start+Math.floor((end-start)>>1);
    return merge(arr,start,mid)+merge(arr,mid+1,end)+mergeHandle(arr,start,mid,end);
  }
}
function mergeHandle(arr,start,mid,end){
  let i=start,n=mid;
  let j=mid+1,m=end;
  let res=0;
  let help=[];
  while(i<=n && j<=m){
    if(arr[i]<arr[j]){
      res+=(end-j+1)*arr[i];
      help.push(arr[i])
      i++;
    }else if(arr[i]>arr[j]){
      res+=0;
      help.push(arr[j]);
      j++;
    }else{
      res+=0;
      help.push(arr[i]);
      help.push(arr[j]);
      i++;
      j++;
    }
  }
  while(i<=n){
    help.push(arr[i]);
    i++;
  }
  while(j<=m){
    help.push(arr[j]);
    j++;
  }
  
  for(let i=0;i<help.length;i++){
    arr[start+i]=help[i];
  }
  return res;
}
function minSum(arr){
  if(arr===null || arr.length<2){
    return arr;
  }else{
    return merge(arr,0,arr.length-1);
  }
}
const arr=[1,3,4,2,5];
console.log(minSum(arr));