const KoaRouter = require("koa-router");
const fileRouter = new KoaRouter({ prefix: '/file' });
const { 
  upload,
  checkFileMd5,
  mergeFile
} = require("../controller/file.controller")
const { fileUpload } = require("../middleware/file.middleware")
fileRouter.post("/upload", fileUpload, upload);
fileRouter.post("/check", checkFileMd5);
fileRouter.post("/merge",mergeFile);
module.exports = fileRouter;