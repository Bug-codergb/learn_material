class Emit{
  constructor() {
    this._emit = {};
  }
  emit(eventName,...args) {
    const callbacks = this._emit[eventName];
    callbacks && callbacks.forEach(fn => {
      fn(...args);
    });
  }
  on(eventName,fn) {
    const callbacks = this._emit[eventName]||[];
    callbacks.push(fn);
    this._emit[eventName] = callbacks;
  }
  off(eventName,fn) {
    const callback = this._emit[eventName];
    for (let i = 0; i < callback.length; i++){
      if (callback[i] === fn) {
        callback.splice(i,1)
      }
    }
  }
}
let emit = new Emit();
emit.on("add", (...args) => {
  console.log(args);
})
emit.emit("add", { name: "gblina", age: 12 }, 190);