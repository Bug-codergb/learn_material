import React, { memo } from "react";
import { HomeContext,DemonContext } from "./context/homeContext";
const About = memo((props) => {
 
  console.log("about从新渲染")
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
          <div>{ value.name}</div>
        )
      }
    }
  </DemonContext.Consumer>
    </div>
  )
})
export default About;