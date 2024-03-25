import React, { memo, useState,useRef ,useEffect} from "react";
import { flushSync } from 'react-dom';
const GUseState = () => {

  const [counter, setCounter] = useState(1);

  const counterRef = useRef();
  const changeCounter = () => {
  
    flushSync(() => {
      setCounter(counter + 1);
    })
    
    console.log(counterRef.current.innerHTML)//强制刷新react 同步更新组件树
    
  }

  useEffect(() => {
    console.log("--------------------------")
    console.log(counter);
    console.log(counterRef.current.innerHTML);
    console.log("------------------------")
  },[counter])
  return <div>
    <h2 ref={counterRef}>{counter}</h2>
    <button onClick={changeCounter}>+++</button>
  </div>
}
export default memo(GUseState);