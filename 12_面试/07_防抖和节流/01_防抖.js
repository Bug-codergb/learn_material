function debounce(fn, dely,immediate = false) {
  let timer = null;
  let isInvoked = false;
  return _debounce = function(...args){
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !isInvoked) {
      fn.apply(this, args);
      isInvoked = true;
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      isInvoked = false;
    }, dely);
  }
  _debounce.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      isInvoked = false;
    }
  }
}