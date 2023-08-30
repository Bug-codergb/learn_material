function _isNaN(value) {
  return Object.prototype.toString(Number(value)) === "NaN";
}
console.log(_isNaN("NaN"))