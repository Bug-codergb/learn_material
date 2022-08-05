function swap(array,i,j){
  let temp=array[i];
  array[i]=array[j];
  array[j]=temp;
}
//选择排序  （在 i~n之间找最小的放在第一位）
function selectSort(array){
  const len=array.length;
  for(let i=0;i<len;i++){
    let minIndex=i;
    for(let j=i+1;j<len;j++){
      if(array[j]<array[minIndex]){
        minIndex=j;
      }
    }
    swap(array,i,minIndex);
  }
}
//冒泡排序
const bubbleSort=(array)=>{
  let len=array.length;
  for(let i=len-1;i>0;i--){
    for(let j=0;j<i;j++){
      if(array[j+1]<array[j]){
        swap(array,j,j+1);
      }
    }
  }
}
const array=[2,3,41,1,3,4,8,7,6];
bubbleSort(array);
console.log(array)