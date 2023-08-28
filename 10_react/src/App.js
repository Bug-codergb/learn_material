import React, { memo } from "react";
import Home from "./pages/Home";
import Category  from "./pages/Category";
import { Provider } from "react-redux";
import store from "./store/index";
const App = () => {
  return (
    <Provider store={store}>
      <Category/>
    </Provider>
  )
}
export default memo(App);