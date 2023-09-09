let makeCounter = function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
};
let count1 = makeCounter();
let count2 = makeCounter();

count1.increment();
console.log(count2.value());
console.log(count1.value());