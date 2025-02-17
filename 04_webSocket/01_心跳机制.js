class WsApp extends WebSocket {
  constructor(url, options) {
    super(url);
    this.heartBeatTimer = null;
    this.reconnectTimer = null;
    const { wsReconnect } = options;
    this.wsReconnect = wsReconnect;
    this.init();
  }
  init() {
    this.bindEvent();
  }
  bindEvent() {
    this.addEventListener("open", this.handleOpen);
    this.addEventListener("message", this.handleMessage);
    this.addEventListener("close", this.handleClose);
    this.addEventListener("error", this.handleError);
  }
  handleOpen() {
    this.startHeartBeat();
  }
  handleMessage(e) {
    const { mode, message } = this.receiveMsg(e);
    switch (mode) {
      case "heart_beat":
        console.log("heart beat");
        break;
      case "message":
        console.log("处理消息", message);
      default:
    }
  }
  handleClose() {
    this.heartBeatTimer && clearInterval(this.heartBeatTimer);
    this.heartBeatTimer = null;

    this.reconnectTimer && clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;

    console.log("socket 关闭");
    this.reconnect();
  }
  handleError() {
    clearInterval(this.heartBeatTimer);
    this.heartBeatTimer = null;
    this.reconnect();
  }
  startHeartBeat() {
    this.heartBeatTimer = setInterval(() => {
      this.readyState === 1 &&
        this.sendMsg({
          mode: "heart_beat",
          message: '"heart beat"',
        });
      if (this.readyState !== 1) {
        clearInterval(this.heartBeatTimer), (this.heartBeatTimer = null);
      }
    }, 3000);
  }
  reconnect() {
    this.reconnectTimer = setTimeout(() => {
      window.navigator.onLine && this.wsReconnect();
    }, 1000);
  }
  sendMsg(data) {
    this.send(JSON.stringify(data));
  }
  receiveMsg(e) {
    return JSON.parse(e.data);
  }
  create(url) {
    return new WsApp(url, options);
  }
}
export default WsApp;
