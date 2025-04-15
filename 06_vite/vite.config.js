import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
const rootPath = process.cwd()
export default defineConfig(()=>{
  return {
    resolve:{
      alias:{
        "@":path.resolve(rootPath,"./src")
      },
    },
    
    server:{
      port:3002,
      proxy:{
        "/api":{
          target:"http://localhost:8000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
    plugins:[
      vue()
    ]
  }
})