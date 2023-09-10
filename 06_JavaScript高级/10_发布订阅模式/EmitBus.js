class EventBus {
  constructor() {
    // 初始化事件列表
    this.eventObject = {};
    // 回调函数列表的id
    this.callbackId = 0;
  }
  // 发布事件
  emit(eventName, ...args) {
    // 取出当前事件所有的回调函数
    const callbackObject = this.eventObject[eventName];

    if (!callbackObject) return console.warn(eventName + " not found!");

    // 执行每一个回调函数
    for (let id in callbackObject) {
      // 执行时传入参数
      callbackObject[id](...args);

      // 只订阅一次的回调函数需要删除
      if (id[0] === "d") {
        delete callbackObject[id];
      }
    }
  }
  // 订阅事件
  on(eventName, callback) {
    // 初始化这个事件
    if (!this.eventObject[eventName]) {
      // 使用对象存储，注销回调函数的时候提高删除的效率
      this.eventObject[eventName] = {};
    }

    const id = this.callbackId++;

    // 存储订阅者的回调函数
    // callbackId使用后需要自增，供下一个回调函数使用
    this.eventObject[eventName][id] = callback;

    // 每一次订阅事件，都生成唯一一个取消订阅的函数
    const unSubscribe = () => {
      // 清除这个订阅者的回调函数
      delete this.eventObject[eventName][id];

      // 如果这个事件没有订阅者了，也把整个事件对象清除
      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    };

    return { unSubscribe };
  }

  // 只订阅一次
  subscribeOnce(eventName, callback) {
    // 初始化这个事件
    if (!this.eventObject[eventName]) {
      // 使用对象存储，注销回调函数的时候提高删除的效率
      this.eventObject[eventName] = {};
    }

    // 标示为只订阅一次的回调函数
    const id = "d" + this.callbackId++;

    // 存储订阅者的回调函数
    // callbackId使用后需要自增，供下一个回调函数使用
    this.eventObject[eventName][id] = callback;

    // 每一次订阅事件，都生成唯一一个取消订阅的函数
    const unSubscribe = () => {
      // 清除这个订阅者的回调函数
      delete this.eventObject[eventName][id];

      // 如果这个事件没有订阅者了，也把整个事件对象清除
      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    };

    return { unSubscribe };
  }

  // 清除事件
  clear(eventName) {
    // 未提供事件名称，默认清除所有事件
    if (!eventName) {
      this.eventObject = {};
      return;
    }

    // 清除指定事件
    delete this.eventObject[eventName];
  }
}

// 测试
const eventBus = new EventBus();

// 订阅事件eventX
eventBus.on("eventX", (obj, num) => {
  console.log("模块A", obj, num);
});
eventBus.on("eventX", (obj, num) => {
  console.log("模块B", obj, num);
});
eventBus.on("eventX", (obj, num) => {
  console.log("模块C", obj, num);
});

// 发布事件eventX
eventBus.emit("eventX", { msg: "EventX published!" }, 1);
console.log(eventBus);

