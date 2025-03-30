import { defineConfig } from "vite"
export default defineConfig(()=>{
  return {
    server:{
      port:3002,
      proxy:{
        "/api":{
          target:"http://localhost:8000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})