const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
router.get("/video", (req, res, next) => {
  const rootPath = process.cwd();
  const filePath = path.resolve(rootPath, "./public/1.mp4")
  res.set("content-type","video/mp4")
  res.sendFile(filePath);
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/home",router)
app.listen(8888, () => {
  console.log("server listening")
})
