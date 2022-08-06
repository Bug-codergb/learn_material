function mergeSortArray(arr1,arr2){
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
let arrOne=[2,4,5,7,8,9];
let arrTwo=[1,3,7,9,13];
console.log(mergeSortArray(arrOne,arrTwo));