function mergeSort(arr,left,right){
  if(arr==null || arr.length<2 || left===right){
    return arr.slice(left);
  }
  let mid=left+Math.floor((right-left)>>1);
  const leftA=arr.slice(left,mid+1);
  const rightA=arr.slice(mid+1,right+1);
  const leftArr=mergeSort(leftA,0,leftA.length-1);
  const rightArr=mergeSort(rightA,0,rightA.length-1);
  return mergeSortHandle(leftArr,rightArr);
}
function mergeSortHandle(arr1,arr2){
  if(arr1.length===0 || arr2.length===0){
    return arr1.concat(arr2);
  }
  let i=0,n=arr1.length;
  let j=0,m=arr2.length;
  let help=[];
  while(i<n && j<m){
    if(arr1[i]>arr2[j]){
      help.push(arr2[j]);
      j++;
    }else if(arr1[i]<arr2[j]){
      help.push(arr1[i]);
      i++;
    }else{
      help.push(arr1[i]);
      help.push(arr2[j]);
      i++;
      j++;
    }
  }
  while(i<n){
    help.push(arr1[i]);
    i++;
  }
  while(j<m){
    help.push(arr2[j]);
    j++;
  }
  return help;
}
const arr=[2,4,1,56,3,7,8,10,9];
//console.log(mergeSort(arr,0,arr.length-1));

//在原数组操作
function process(arr,start,end){
  console.log(start,end)
  if(start===end){
    return;
  }
  const mid=start+Math.floor((end-start)>>1);
  process(arr,start,mid);
  process(arr,mid+1,end);
  merge(arr,start,mid,end);
}
function merge(arr,start,mid,end){
  let i=start,n=mid;
  let j=mid+1,m=end;
  let res=[];
  while(i<=n&&j<=m ){
    if(arr[i]<arr[j]){
      res.push(arr[i]);
      i++;
    }else if(arr[i]>arr[j]){
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
const a=[1,4,3,2,56,11,8,7,14,9,10];
process(a,0,a.length-1);
console.log(a)

