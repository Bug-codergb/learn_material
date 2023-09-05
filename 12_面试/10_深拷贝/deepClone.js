function getValueType(value) {
  let type = Object.prototype.toString.call(value);
  let exp = /^\[*\w+\W+/g;
  let res = type.replace(exp,"");
  return res.toLowerCase().substring(0,res.length-1)??"";
}
const Type = {
  "number": "number",
  "boolean": "boolean",
  "string":"string",
  "map": "map",
  "set": "set",
  "null": "null",
  "undefined": "undefinec",
  "symbol": "symbol",
  "array": "array",
  "date": "date",
  "regexp": "regexp",
  "object":"object"
}
Object.freeze(Type);
function deepClone(raw) {
  if (raw === null || typeof raw!=="object" || raw.valueOf()!==raw) {
    return raw;
  }
  let res = {};
  if (getValueType(raw) === Type.array) {
    res = [];
  }
  for (const key in raw) {
    const value = raw[key];
    const type = getValueType(value);
    switch (type) {
      case Type.object:
      case Type.array:
        res[key] = deepClone(value); break;
      case Type.map:
        let map = new Map();
        value.forEach((value, key) => {
          map.set(key, deepClone(value))
        })
        res[key] = map; break;
      case Type.set:
        let set = new Set();
        value.forEach((item) => {
          set.add(deepClone(item));
        });
        res[key] = set; break;
      default:
        res[key] = value
    }
  }
  return res;
}
console.log(deepClone(Symbol()))
