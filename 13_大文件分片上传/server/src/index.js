const Koa = require("koa");
const app = new Koa();
const {
    initFileDir
 }  =require("./utils/index.js")

const fileRouter = require("./router/file.router")
const koaBodyparser = require('koa-bodyparser');

app.use(koaBodyparser()); 
app.use(fileRouter.routes());
app.use(fileRouter.allowedMethods());
app.listen(8888, () => {
  console.log("服务启动") 
})

initFileDir();