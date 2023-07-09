const exp = /test/m; //m表示多行匹配
let str = "今天是个好日子 \ntest";
console.log(exp.test(str));
const reg = /[0-9][0-9][0-9]/g;
console.log("0987hfweiofefi345".match(reg));//只会匹配到098，345，不会匹配到987