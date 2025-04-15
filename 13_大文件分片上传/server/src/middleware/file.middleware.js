const Multer=require('koa-multer');
const fs = require("fs");
const path = require('path');
const createUploadPath=(relativePath)=>{
  const fullPath = path.resolve(__dirname,"../../",relativePath);
  fs.access(fullPath,(err)=>{
    if(err){
      const arr=relativePath.split("/").filter((item)=>item!==".");
      let str = path.resolve(__dirname,"../../");
      for(let item of arr){
        str+=`/${item}`;
        try{
          fs.accessSync(str);
        }catch (e) {
          fs.mkdirSync(str);
        }
      }
    }
  })
}
function fileStorageChunk(filePath) {
  try {
    return Multer.diskStorage({
      destination: function (req, file, cb) {
        const { totalNumber,
          chunkIndex,
          fileHash,
          chunkSize
         } = req.body;  
      
        try {
          fs.accessSync(`${filePath}/${fileHash}`)
          cb(null, `${filePath}/${fileHash}`);
        } catch (err) {
          fs.mkdirSync(`${filePath}/${fileHash}`)
          cb(null, `${filePath}/${fileHash}`);  
        }
      },
      filename: function (req, file, cb) {
        const { totalNumber, chunkIndex, filePath, fileHash } = req.body;
        cb(null, fileHash+`-${chunkIndex}-${totalNumber}`+ path.extname(file.originalname));
      }
    })
  }catch (e) {
    console.log(e)
  }
}
function chunkHandle(relativePath,uploadName,method){
  try{
    createUploadPath(relativePath);
    const methods=['single','array']
    if(!methods.includes(method)){
      return;
    }
    const upload = Multer({
      storage:fileStorageChunk(relativePath),
    })
    return upload[method](uploadName)
  }catch (e) {
    console.log(e)  
  }
}

//视频上传
const fileUpload = chunkHandle("./upload/", 'file', 'single'); 
module.exports = {  
  fileUpload
}