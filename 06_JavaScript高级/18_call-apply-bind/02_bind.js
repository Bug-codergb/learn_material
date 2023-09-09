Function.prototype.gbBind = function (thisArg, ...argArr) {
  let fn = this;
  function _gbBind(...args) {
    thisArg = thisArg ? Object(thisArg) : window;
    thisArg.fn = fn;
    let finalParams = [...argArr,...args]
    let res = thisArg.fn(finalParams);
    delete thisArg.fn;
    return res;
  }
  return _gbBind;
}