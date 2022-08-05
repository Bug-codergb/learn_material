let obj={
  _name:"哈哈哈",
  set name(newName){
    console.log(this)
    this._name=newName;
  },
  get name(){
    console.log(this);//没有传reciver，值为obj,传入后为obj的代理对象
    return this._name;
  }
}
let proxy=new Proxy(obj,{
  get(target,key,reciver){
    console.log(`获取${key}的值`)
    return Reflect.get(target,key,reciver);
  },
  set(target,key,newVal){
    console.log(`设置${key}的值`)
    Reflect.set(target,key,newVal);
  }
})
console.log(proxy.name)