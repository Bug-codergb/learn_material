let obj = {
  age:19
};
Object.defineProperty(obj, "name", {
  configurable: true,
  writable: true,
  enumerable: false,
  value:"gblina"
})
console.log(Object.getOwnPropertyDescriptor(obj, "name"));
console.log(Object.getOwnPropertyDescriptors(obj));