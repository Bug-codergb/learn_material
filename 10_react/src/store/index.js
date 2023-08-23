import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counter"
const store = configureStore({
  reducer: {
    user:counterReducer
  }
})
export default store;