let personName, personAge;
let person = {
  name: "gb",
  age: 12
};
({ name:personName, age:personAge } = person);
console.log(personName, personAge);

function foo(arg1,{name,age},arg2) {
  console.log(arguments);
  console.log(Array.from(arguments));
}
foo(1,person,2)