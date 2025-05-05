import { useEffect,memo } from "react"
import { RouterProvider } from "react-router-dom"
import router from "./router/index"
import { Outlet } from "react-router";
const App=()=>{
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}
export default memo(App)
