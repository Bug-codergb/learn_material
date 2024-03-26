import React, { memo,useState,useTransition } from "react";
//将某些更新任务滞后
const GUseTransition = () => {
  const [counter, setCounter] = useState(30);
  const [pedding, setTransition] = useTransition()

  const inpChange = (e) => {
    const value =e.currentTarget.value;
    setTransition(() => {
      setCounter(value);  
    })
  }
  return <div>
    <input onChange={inpChange} />
    {pedding && <span>加载中...</span>}
    <ul>
      {
        new Array(Number(counter)).fill(`${Math.random()}-${Math.random()}`).map((item,index) => {
          return <li key={index}>{item }</li>
        })
      }
    </ul>
  </div>
}
export default memo(GUseTransition)