const express = require("express");
const app = express();
// 
app.all("*", (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/test1", (req,res,next) => {
  res.send({
    status: 200,
    data:"test1"
  })
})
app.get("/test2", (req,res,next) => {
  res.send({
    status: 200,
    data:"test2"
  })  
})
app.get("/test3", (req,res,next) => {
  res.send({
    status: 200,
    data:"test3"
  })
})
app.get("/test4", (req,res,next) => {
  res.send({
    status: 200,
    data:"test4"
  })
})
app.get("/test5", (req,res,next) => {
  res.send({
    status: 200,
    data:"test5"
  })
})
app.get("/test6", (req,res,next) => {
  res.send({
    status: 200,
    data:"test6"
  })
})
app.get("/test7", (req, res, next) => {
  res.send({
    status: 200,
    data: "test7"
  })
});

app.get("/test8", (req, res, next) => {
  res.send({
    status: 200,
    data: "test8"
  });
})
app.get("/test9", (req,res,next) => {
  res.send({
    status: 200,
    data: "test9"
  });
})

app.get("/list", (req, res, next) => {
  res.set("Location", "https://www.baidu.com");
  res.status(301)
  res.send({
    status: 307
  });
});

app.listen(8888, () => {
  console.log("服务启动");
});

