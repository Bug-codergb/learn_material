import React,{memo,useEffect,useState,useRef} from "react"
const UseEffect=()=>{
  const [count,setCount] = useState(0);
  const isInitialMount = useRef(true);
  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    console.log('依赖项变化了');
  },[count])

  const handleAdd=()=>{
    setCount(count+1)
  }
  return <div>
    <button onClick={()=>handleAdd()}>+</button>
  </div>
}
export default memo(UseEffect)