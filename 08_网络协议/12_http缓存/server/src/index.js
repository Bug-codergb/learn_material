const express = require("express");
const path = require("path");
const app = express();
app.get("/img", (req, res, next) => {
  res.set("expires", new Date("2023-09-10 21:05:00").toUTCString());
  res.sendFile(path.resolve(__dirname,"./assets/anni.jpeg"))
})
app.listen(8888, () => {
  console.log("server on  8888")  
})