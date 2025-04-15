const fs = require("fs");
const path = require("path");
function initFileDir() {
  const rootPath = path.resolve(process.cwd(), "./file");
  fs.access(rootPath, (err) => {
    if (err) {
      fs.mkdirSync(rootPath)
    }
  })
}  
module.exports = {
  initFileDir
} 