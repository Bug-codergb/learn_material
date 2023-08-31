class Mitt{
  constructor() {
    this._events = {};
  }
  on(name, fn) {
    const callbacks = this._events[name] || [];
    callbacks.push(fn);
    this._events[name] = callbacks;  
  }
  emit(name,...arg) {
    const callbacks = this._events[name] || [];
    callbacks.forEach((cb) => {
      cb(...arg);
    })
  }
  off(name,fn) {
    const callbacks = this._events[name] || [];
    for (let i = 0; i < callbacks.length; i++){
      const callback = callbacks[i];
      if (fn === callback) {
        callbacks.splice(i,1)
      }
    }
  }
}
let emit = new Mitt();
emit.on("app", () => {
  console.log("app");
})
let fn = () => {
  console.log("flutter")
}
emit.on("app", fn)
emit.off("app", fn)
emit.emit("app",{name:"op"})