function addCount(count){
  function add(num){
    return count+num;
  }
  return add;
}

const add5=addCount(5);
console.log(add5(4))
const add10=addCount(15);
console.log(add10(89))