import { createApp, render } from "vue"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/index"
import App from "./App.vue"
const app = createApp(App)
app.use(router)
app.use(ElementPlus)

async function fn(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },300)
  })
}
async function renderApp(){
  await fn()
  app.mount("#root")
}
renderApp()
console.log("app")