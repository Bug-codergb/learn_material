function throttle(fn, interval,immediate=true) {
  let startTime = 0;
  return function _throttle(...args){
    let nowTime = new Date().getTime();

    if (!immediate && startTime ===0) {
      startTime = nowTime;
    }
    let waitTime = interval - (nowTime - startTime);
    if (waitTime <= 0) {
      fn.apply(this,args);
      startTime = nowTime;
    }
  }
}
