/**
 * 
 * js中所有数字都是以64位浮点数存储，整数也是
 * 整数运算时会将64位浮点数转为32位整数
 * 
 * 一共64位
 *  第 1 位：符号位，0表示正数，1表示负数
 *  第 2 位到第 12位 （一共11位）：指数部分
 *  第 13 位到 64位 （一共52位）：小数部分
 *  
 *  符号位决定了一个数的正负
 *  指数部分决定了数的大小
 *  小数部分决定了数的精度
 * 
 *  最终数据格式表示位 
 *  (-1)^(符号位) * 1.xxx * 2^xxxx 
 * 
 *   指数部分一共十一位 
 * 
 *   所以js提供的有效数字为2^53
 *   
 * 指数部分11位 2^11次方(0~2047) 正负数（-1023 ～ 1024）
 */
console.log(1.0 === 1);//相等
console.log(Math.pow(2,53));
console.log(Math.pow(2,53)+1);
console.log(Math.pow(2, 53) - 1);
console.log(Math.pow(2, 11));

console.log(Math.pow(2, 1023));
console.log(Math.pow(2, 1024));
console.log(Math.pow(2, -1074));

console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);
console.log(1234567890123456789012)//小数点前>21位
let a = 1234567890123456789012;
console.log(a.toString())
console.log(a.toString().length);
console.log(0.0000001)//小数点后的0大于5位
console.log(0.12345678901234567890)//由于2的53为16位，所以可以精确表示15数字

//15位数字
console.log(99999999999999972399)
console.log(123456789012345697399)//只能精确表示15位

//+0和-0都是完全相等的，但是在作为分母时是不相等的
console.log(Number.isNaN(0))
console.log(NaN + "00")

console.log(Infinity > NaN);
console.log(0 * Infinity);//NaN
console.log(0/Infinity)//0

console.log(parseInt(`11010`, 2))//返回一个十进制，2～36

function myIsNaN(value) {
  return value !== value;
}
console.log(myIsNaN({}));
console.log(Number([]))//0
console.log(Number([1]))//1
console.log(Number([`12`]))//12