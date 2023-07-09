/**
 * 验证用户密码，必须包含大写，小写，数字，特殊符号 8-16位 
 */
function validatePassword(str) {
  if (!str) {
    return false;
  }
  let exp = /(?=.*\d)(?=.*[A-z])[\dA-z]{4,5}/;
  console.log(exp.test(str));
  console.log(str.match(exp))
}
let password = "du42iopu";
console.log(validatePassword(password));