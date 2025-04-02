let ws = new WebSocket("ws://localhost:8000/ws/chat/")
ws.onopen = ()=>{
  console.log("打开")
  ws.send(JSON.stringify({
    "message":"心跳"
  }))
}
ws.onopen = ()=>{
  console.log("打开")
}
ws.onopen = ()=>{
  console.log("打开")
}
ws.onmessage=(e)=>{
  console.log(JSON.parse(e.data))
}
const btn = document.getElementById("btn")
btn.addEventListener("click",()=>{
  ws.send(JSON.stringify({
    "message":"hello"+Math.random()+"双色球"
  }))
})