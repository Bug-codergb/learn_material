function foo(){
  a="foo";//省略定义变量的关键字，将会定义到全局
}
foo();
//console.log(a);
//console.log("a" in window);//true,var定义的变量会被保存在window上面
let p= new Promise((resolve,reject)=>{
  for(var i=0;i<10;i++){//会声明到全局，而且只有一个var
    if(i===10){
      resolve(i);
    }
  }
  if(i==10){
    resolve(i)
  }
}).then((data)=>{
  console.log(data);
})
