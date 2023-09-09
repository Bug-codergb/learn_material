function debounce(fn, dely, immediate) {
  let t = null;
  let invoked = false;
  function _debounce(...args) {
    if (t) {
      clearTimeout(t);
    }
    if (!invoked && immediate) {
      fn.apply(this, args);
      invoked = true;
      return;
    }
    t= setTimeout(() => {
      fn.apply(this, args);
      invoked = false;//当用户收入完毕后，立即执行恢复为false
    },dely)
  }
  _debounce.cancel = function () {
    if (t) {
      clearTimeout(t);
      invoked = false;
      t = null;
    }
  }
  return _debounce;
}