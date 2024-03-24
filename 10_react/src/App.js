import React, { memo } from "react";
import GUseEffect from "./pages/GUseEffect";
import {
  HashRouter
} from "react-router-dom"
const App = () => {
  return (
    <HashRouter>
      <GUseEffect/>
    </HashRouter>
  )
}
export default memo(App);