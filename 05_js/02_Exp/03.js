let getType = (data) => {
  let type = Object.prototype.toString.call(data);
  let exp = /\s[\w]+/g
  let res=null
  if (res=type.match(exp)) {
    return res[0].trim().toLowerCase() 
  } else {
    return undefined;
  }
}
console.log(getType(true));
console.log(getType("123"));
console.log(getType(12));
console.log(getType(() => { }));
console.log(getType({}));
console.log(getType(undefined));