import { defineConfig } from "vite"
import react from '@vitejs/plugin-react'
export default defineConfig(()=>{
  return {
    resolve:{
      extensions:['.jsx','.js',".json"]
    },
    server:{
      port:3000
    },
    plugins:[
      react()
    ]
  }
})