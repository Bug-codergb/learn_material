import React, { memo,useContext } from "react";
import { HomeContext,DemonContext } from "./context/homeContext";
const About = memo((props) => {
 const context = useContext(HomeContext);
 console.log(context);
  console.log("about从新渲染")
  const {increment} = props;
  const aboutHandler=()=>{
    increment("lina")
  }
  return (
    <div>
      <HomeContext.Consumer>
      {
        (value) => {
          return (
            <div>{value.name}-{ value.age}</div>
          )
        }
      }
    </HomeContext.Consumer>
    <DemonContext.Consumer>
    {
      (value) => {
        return (
          <div>{
            value.name}
            <button onClick={()=>aboutHandler()}>about点击哈哈哈</button>
          </div>
        )
      }
    }
  </DemonContext.Consumer>
    </div>
  )
})
export default About;