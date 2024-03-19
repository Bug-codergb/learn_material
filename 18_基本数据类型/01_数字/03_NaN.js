console.log(2-"s")
console.log("s"-2)
console.log("s"*2)
console.log("s" / 2)
console.log(1 / 0)//无限大
console.log(0 / 0)//Nan

console.log(2 + "2")  

console.log(2+null)
console.log(2-null)
console.log(2 / null)
console.log(null/null)
console.log(null / 1)//null会被转化为0


console.log(undefined+1)
console.log(undefined/1)
console.log(undefined * 1)

console.log(typeof NaN)


function myNaN(value) {
  return value!==value
}
console.log(Number({0:1}))//nan
console.log(Number(["d"]))//会取数组的0元素
console.log(Number("   "))//没有转为0


console.log(isNaN({}))//对象会被转为nan
console.log(isNaN(() => []))//数组会被转为nan
console.log(isNaN(new Set()))

console.log(!!NaN)