import React, { memo,useState ,useCallback} from "react";
import About from "./About";
const Profile = () => {
  const [counter, setCounter] = useState(1);
  const handler = () => {
    setCounter(counter + 1);
  }
  const increment = useCallback((arg)=>{
    console.log("jitn");
    console.log(arg,"arg")
  },[])
  return (
    <div>
      <h1>我是profile组件 count-{ counter}</h1>
      <About increment={increment} />
      <button onClick={()=>handler()}>点击切换改变</button>
    </div>
  )
}
export default memo(Profile);