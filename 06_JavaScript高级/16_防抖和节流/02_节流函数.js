function throttle(fn, dely,immediate = true) {
  let startTime = 0;
  let t = null;
  function _throttle(...args) {
    let nowTime = new Date().getTime();

    if (!immediate && startTime === 0) {
      startTime = nowTime;
    }
    if (t) {
      clearTimeout(t);
    }
    let waitTime = dely - (nowTime - startTime);

    if (waitTime <= 0) {
      fn.apply(this, args);
      startTime = nowTime;
    } else {
      t = setTimeout(() => {
        fn.apply(this, args);
      }, dely);
    }
  }
  return _throttle;
}