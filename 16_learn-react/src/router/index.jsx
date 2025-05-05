import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router";
import { lazy } from "react"
const UseEffect = lazy(()=>import("../views/UseEffect"))

const router = createBrowserRouter([
  {
    path: "/",
    element:<Navigate to="/use-effect" />
  },
  {
    path:"/use-effect",
    element:<UseEffect/>
  }
]);
export default router