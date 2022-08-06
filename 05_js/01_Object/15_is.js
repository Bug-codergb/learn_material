console.log(Object.is(1,2));   //false
console.log(Object.is(1,true)); //false
console.log(Object.is(true,true)); //true
console.log(Object.is(undefined,undefined)); //true
console.log(Object.is({},{})); //false
console.log(Object.is([],[]));  //false
console.log(Object.is(null,null));//true
console.log(Object.is("",""));  //true