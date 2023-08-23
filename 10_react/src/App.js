import React, { memo } from "react";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./store/index";
const App = () => {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  )
}
export default memo(App);