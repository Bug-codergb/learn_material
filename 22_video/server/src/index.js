const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
router.get("/video", (req, res, next) => {
  const rootPath = process.cwd();

  const filePath = "public/video/3.m4v"
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.get('range');

  const parts = range.replace(/bytes=/, "").split("-");
 
  const start = parseInt(parts[0], 10);
  const end = Math.min(start + 999999, fileSize - 1);

  const chunkSize = (end - start) + 1;

  console.log(fileSize)
  console.log(start, end);
  const file = fs.createReadStream(filePath,{ start, end });

  res.setHeader('Content-Type', 'video/mp4'); 
  res.setHeader("Content-Range", `bytes ${start}-${end}/${fileSize}`)
  res.setHeader("Content-Length",chunkSize),
  res.setHeader("Accept-Ranges", "bytes")

  res.status(206);
  return file.pipe(res);

})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/home",router)
app.listen(8888, () => {
  console.log("server listening")
})
