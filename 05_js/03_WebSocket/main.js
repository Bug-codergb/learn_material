import Ws from "./ws.js";
let ws = null;
function wsConnect() {
  ws = Ws.create("ws://localhost:8888", {
    wsReConnect
  })
}
function wsReConnect() {
  if (!ws) {
    return wsConnect();
  }
  if (ws && ws.reconnectingTimer) {
    clearTimeout(this.reconnectingTimer);
    this.reconnectingTimer = null;
    wsConnect();
  }
}
const sendMsg = () => {
  ws.sendMsg({
    mode: "MESSAGE",
    msg:"hello"
  })
}
wsConnect();