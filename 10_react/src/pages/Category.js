import React, {
  memo, useState,
} from "react";
import {flushSync} from "react-dom"
const Category = () => {
  const [counter, setCounter] = useState(0);
  const handler = () => {
    setCounter(counter + 1);
    flushSync(() => {
      console.log(counter)
      setCounter(counter + 1);
      console.log(counter);
    })
    console.log(counter)
  }
  return (
    <div>
      {counter}
      <button onClick={()=>handler()}>jiajiajia</button>
    </div>
  )
}
export default memo(Category);