function iterator() {
  const isFunction = Object.prototype.toString
    .call(this)
    .includes("object Function");
  if (isFunction) {
    const fnStr = this.toString();
    const exp = /function\s+\w+\(([^)]+)\)/;
    const match = fnStr.match(exp);
    if (match && match[1]) {
      const params = match[1];

      let arr = params.split(",");
      let index = -1;
      return {
        next: function () {
          index++;
          return {
            value: arr[index],
            done: index >= arr.length,
          };
        },
      };
    } else {
      return {
        next() {
          return {
            vallue: undefined,
            done: true,
          };
        },
      };
    }
  } else {
    throw new Error("no iterator");
  }
}
function fn(a,b,d) {}
let obj = {};
fn[Symbol.iterator] = iterator;
for (let item of fn) {
  console.log(item);
}

let arr = [1,2,3,4,5];

let object={};
object[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
for(let item of object){
  console.log(item)
}

Object.prototype[Symbol.iterator] = function(){
  const keys = Object.keys(this);
  let index = -1;
  return {
    next:()=>{
      index++;
      return {
        value:this[keys[index]],
        done:index>=keys.length
      }
    }
  }
}
let [a,b] = {a:12,b:54};
console.log(a,b)
