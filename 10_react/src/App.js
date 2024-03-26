import React, { memo,useState } from "react";
import GUseTransition from "./pages/GUseTransition";
import {
  HashRouter
} from "react-router-dom"
const App = () => {
  const [isShow, setIsShow] = useState(true);
  
  const changeShow = () => {
    setIsShow(!isShow);
  }
  return (
    <HashRouter>
      {
        isShow&&<GUseTransition/>
      }
      <button onClick={changeShow}>切换组件显示状态</button>
    </HashRouter>
  )
}
export default memo(App);