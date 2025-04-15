import vuePlugin from "@vitejs/plugin-vue";
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";
import path from "path";
export default defineConfig(() => {
    return {
        mode: "development",
        resolve: {
            alias: {
                "@":path.resolve(process.cwd(),"./src")
            }
        },
        server: {
            port: 7877,
            open: true,
            proxy: {
                "/api": {
                    target: "http://localhost:8888",
                    changeOrigin: true,
                    rewrite:(path)=>path.replace(/^\/api/,'')
                }
            }
        },
        plugins: [
            vueJsxPlugin(),
            vuePlugin(),
        ]
    }
})