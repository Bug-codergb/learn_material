const express = require("express")
const app = express()
app.use(express.json());
const router = express.Router()
router.get("/user",(req,res)=>{
  res.json({
    code:200,
    data:[
      {
        id:1001,
        name:"guobin"
      },
      {
        id:1002,
        name:"lina"
      }
    ]
  })
})
app.use("/home",router)

app.listen(8888,()=>{
  console.log("服务启动")
})