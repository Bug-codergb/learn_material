function throttle(fn, interval,immediate=true) {
  let startTime = 0;
  let t = null;
  return function _throttle(...args){
    let nowTime = new Date().getTime();

    if (!immediate && startTime ===0) {
      startTime = nowTime;
    }

    if (t) {
      clearTimeout(t);
    }
    let waitTime = interval - (nowTime - startTime);
    if (waitTime <= 0) {
      fn.apply(this,args);
      startTime = nowTime;
    } else {
      t = setTimeout(() => {
        fn.apply(this, args);
      },interval)
    }
  }
}
