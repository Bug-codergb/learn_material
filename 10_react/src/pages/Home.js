import React, { memo } from "react";
import Profile from "./Profile";
import Recommend from "./Recommend"
import { 
  HomeContext,
  DemonContext
} from "./context/homeContext";
const Home = () => {
  return (
    <DemonContext.Provider value={{ name:"lina"}}>
      <HomeContext.Provider value={{name:"gb",age:18} }>
        <Profile />
        <Recommend/>
      </HomeContext.Provider>
    </DemonContext.Provider>
  )
}
export default memo(Home);