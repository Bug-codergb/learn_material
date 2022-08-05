1. JavaScript引擎在解析JavaScript时会生成一个全局对象`` GlobalObject ``包含一些全局对象，他可能存在多个JS对象如console, math,string,Math.她最重要的是拥有有一个window属性指向自己
2. 代码被解析，v8引擎内部会帮助我们创建一个对象GO（Global Object）
3. v8为了执行代码，v8引擎内部会有一个执行上下文栈（Excution Context Stack）（函数调用栈）
4. 为了全局代码能够执行，需要创建 全局执行上下文（全局代码需要被执行时才会创建）
5. 全局执行上下文（存放全局代码）
6. 执行上下文（函数调用栈）一般存放函数
7. VO（variable Object）变量对象
8. JavaScript在编译阶段（以全局执行上下文）会将变量存于Global Object中，基础数据类型变量会被赋值`` undefined ``,而引用变量会被赋值为内存地址。
9. 函数执行上下文文中会存在一个AO（activation Object）存放函数内部定义的变量包含函数参数
10. 当我们查找一个变量时，真是的查找路径是沿着作用域链来查找
11. 作用域链=AO+..+GO
12. 作用域链时JavaScript中变量的一种查找规则，当代码执行到一个变量的使用时，他首先会在当前作用域的VO中去寻找，函数作用域一般为AO，若VO中不存在，则去父级作用域parent scope去寻找，（一般也为VO->AO）,不存在则去父级作用域查找，一直查找到全局作用域GO，若GO中也不存在则报错
VO(AO)=>parent Scope(VO)=>parent Scope(VO)=>......=>GO