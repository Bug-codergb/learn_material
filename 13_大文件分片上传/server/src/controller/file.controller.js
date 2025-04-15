const path = require("path");
const fs = require("fs");
class FileController{
  upload(ctx, next) {
    ctx.body = {
      status: 200, 
      data:"hello"
    }
  }
  checkFileMd5(ctx, next) {
    const { md5 } = ctx.request.body;
    const rootPath = process.cwd();
    const filePath = path.resolve(rootPath, `./upload/${md5}`);
    try {
      fs.accessSync(filePath);
      const rawFileList = fs.readdirSync(filePath);
      let fileList = []
      rawFileList.forEach((item, index) => {
        const lastIndex = item.lastIndexOf(path.extname(item));
        if (item !== '.DS_Store') {
          fileList.push(item.substring(0, lastIndex));
        }
      })
      let isMerged = false;
      if (fileList.length === 0) {
        try {
          const ret = fs.readdirSync(path.resolve(process.cwd(), `./file`));
          for (const file of ret) {
            const fileName = path.parse(file).name;
            if (fileName === md5) {
              isMerged = true;
              break;
            }
          }
        } catch (e) {
          isMerged = false;
        }
      }
      ctx.body = {
        status: 200,
        data: fileList,
        isMerged 
      }
    } catch (e) {
      ctx.body = {
        status: 200,
        data:[]
      }
    } 
  }
  mergeFile(ctx, next) {
    const { totalNumber, md5 } = ctx.request.body;
    const storagePath = path.resolve(process.cwd(), `./upload/${md5}`);
    try {
      fs.accessSync(storagePath);
      let chunkList = fs.existsSync(storagePath) ? fs.readdirSync(storagePath) : []
      if(chunkList && Array.isArray(chunkList)) {
        chunkList = chunkList.filter(item=>item!==".DS_Store")
      }
      if (chunkList.length !== totalNumber) {
        ctx.body = {
          status: 200,
          message:"视频合并失败，缺少分片" 
        }
        return;
      } else {
        chunkList.sort((a, b) => {
          const prevIndex = a.split("-")[1];
          const nextIndex = b.split("-")[1];
          return Number(prevIndex) - Number(nextIndex);
        })
        const finalStoragePath = path.resolve(process.cwd(), `./file`);
        try {
          fs.accessSync(finalStoragePath);
          chunkList.forEach((item) => {
            const source = path.resolve(process.cwd(), `./upload/${md5}`)
            const extname = path.extname(item);
            fs.appendFileSync(`${finalStoragePath}/${md5}${extname}`, fs.readFileSync(`${source}/${item}`))
            fs.unlinkSync(`${source}/${item}`); 
          })
          ctx.body = {
            status: 200,
            message:"文件合并完成"
          }
        } catch (e) {
          fs.mkdirSync('file');  
            //todo :合并文件
        }
      }
    } catch (e) {
      ctx.body = {
        status: 200,
        message: e.message,
        data:{}
      }
    }
  }
}
module.exports = new FileController()   