function toUpperCaseUtil() {
  let obj = {};
  let a = 123;
  return (str) => {
    console.log(a);
    a=456
    return obj[str] ? obj[str] : (obj[str] = str.toLocaleUpperCase())
  }
}
const toUpperCase = toUpperCaseUtil();
toUpperCase("app");
toUpperCase("app");
toUpperCase("app");
toUpperCase("app");
toUpperCase("app");
toUpperCase("app");