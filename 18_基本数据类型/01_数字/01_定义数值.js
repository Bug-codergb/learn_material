let foo = 12;
console.log(typeof foo);//typeof 返回字符串
console.log(typeof typeof foo);
console.log(typeof typeof typeof foo);
/**
 * js中所有数字都是以64位浮点数表示
 * 
 */
console.log(1 === 1.00)//true
/**
 * js在进行整数运算的时候，会将 64位浮点数转化为32位整数
 * 第 1 位： 符号为，表示正数或者负数
 * 第 2 位到第 12 位 （共11位）：指数部分
 * 第 13 位到第 64 位（共52位）：小数部分
 * 
 * (-1)^符号位 * 1.xxxxx * 2 ^指数部分
 * 
 * 所以js能表示的最大整数为2^-52 到 2^53
 * 
 */
console.log(Math.pow(2,53))
console.log(Math.pow(2, 54))//js精确处理15位有效数字

// js能够表示的数字范围 （2^1024,2-1023）
// 指数部分11位，