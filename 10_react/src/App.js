import React, { memo,useState } from "react";
import GUseState from "./pages/GUseState";
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
        isShow&&<GUseState/>
      }
      <button onClick={changeShow}>切换组件显示状态</button>
    </HashRouter>
  )
}
export default memo(App);