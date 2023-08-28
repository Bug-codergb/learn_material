class Ws extends WebSocket{
  constructor(url,options) {
    super(url);
    this.wsURL = url;
    this.heartBeatTimer = null;
    this.reconnectingTimer = null;
    const { wsReConnect } = options;

    this.wsReCOnnect = wsReConnect;
  }
  init() {
    this.bindEvent();
  }
  bindEvent() {
    this.addEventListener("open", this.handleOpen);
    this.addEventListener("message", this.handleMessage);
    this.addEventListener("close", this.handleClose);
    this.addEventListener("error", this.handlError);
  }
  handleOpen() {
    console.log("---------client open-----------");
    this.startHeartBeat();
  }
  handleMessage() {
    
  }
  handleClose() {
    console.log("-----------client close----------");
    if (this.heartBeatTimer) {
      clearInterval(this.heartBeatTimer);
      this.heartBeatTimer = null;
    }
    if (this.reconnectingTimer) {
      clearTimeout(this.reconnectingTimer);
      this.reconnectingTimer = null;
    }
    this.reconnect();
  }
  handlError() {
    console.log("-------------client error----------");
    this.reconnect();
  }
  startHeartBeat() {
    this.heartBeatTimer = setInterval(() => {
      if (this.readyState === 1) {
        this.sendMsg({
          mode: "HEART_BEAT",
          msg:"HEART_BEAT"
        })
      } else {
        clearInterval(this.heartBeatTimer);
        this.heartBeatTimer = null;
      }

      this.waitForResponse();
    },4000)
  }
  reconnect() {
    this.reconnectingTimer = setTimeout(() => {
      this.wsReCOnnect();
    },3000)
  }
  //模拟关闭
  waitForResponse() {
    setTimeout(() => {
      this.close();
    },2000)
  }

  static create(url,options) {
    return new Ws(url, options);
  }
}
export default Ws;