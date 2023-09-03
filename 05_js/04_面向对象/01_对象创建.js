let obj = {};
Object.defineProperty(obj, "name", {
  configurable: false,
  enumerable: true,
  value:12
})
delete obj.name;
console.log(obj)
