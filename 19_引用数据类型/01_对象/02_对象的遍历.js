let s= Symbol("example")
const obj = {
  "app": "foo",
  [s]: () => {
    console.log(10)
  }
}
for (const key in obj) {
  console.log(key)
}

console.log(Object.keys(obj));//无法获取symbol
console.log(Reflect.ownKeys(obj))//可以获取symbol
console.log(Object.getOwnPropertyNames(obj))//无法获取symbol

console.log(Object.getOwnPropertySymbols(obj))
