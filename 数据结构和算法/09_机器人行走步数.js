// function getSteps(arr,cur,k,target){
//   if(arr.length<1){
//     return;
//   }else{
//     return getStepsHandle(arr,cur,k,target,k);
//   }
// }
// function getStepsHandle(arr,cur,k,target,rest){
//   if(rest===0){
//     console.log(cur,target)
//     return cur===target?1:0;
//   }else if(cur===1){
//     return getStepsHandle(arr,2,k,target,rest-1);
//   }else if(cur===arr.length){
//     return getStepsHandle(arr,arr.length-1,k,target,rest-1);
//   }else{
//     return getStepsHandle(arr,cur-1,k,target,rest-1)+getStepsHandle(arr,cur+1,k,target,rest-1);
//   }
// }
//加入dp
function getSteps1(cur,rest,target,n){
  // let dp=new Array(n+1).fill(new Array(rest+1).fill(-1));
  let dp=new Array(n+1).fill().map(item=>Array(rest+1).fill(-1));
  return getStepsHandle1(cur,rest,target,n,dp)
}
function getStepsHandle1(cur,rest,target,n,dp){
  if(dp[cur][rest]!==-1){
    return dp[cur][rest];
  }
  let ans=0;
  if(rest===0){
     ans=cur===target?1:0;
  }else if(cur===1){
    ans=getStepsHandle1(2,rest-1,target,n,dp);
  }else if(cur===n){
    ans=getStepsHandle1(n-1,rest-1,target,n,dp);
  }else{
    ans=getStepsHandle1(cur-1,rest-1,target,n,dp)+getStepsHandle1(cur+1,rest-1,target,n,dp);
  }
  dp[cur][rest]=ans;
  return ans;
}
//console.log(getSteps1(2,4,4,4));

function getSteps2(cur,rest,target,n){
  let dp=Array(n+1).fill().map(item=>Array(rest+1).fill(0));
  for(let i=1;i<=n;i++){
    if(i===target){
      dp[i][0]=1;
    }else{
      dp[i][0]=0;
    }
  }
  for(let r=1;r<=rest;r++){
    dp[1][r]=dp[2][r-1];
    for(let cur=2;cur<n;cur++){
      dp[cur][r]=dp[cur-1][r-1]+dp[cur+1][r-1]
    }
    dp[n][r]=dp[n-1][r-1];
  }
  return dp[cur][rest]
}
console.log(getSteps2(2,4,4,4));