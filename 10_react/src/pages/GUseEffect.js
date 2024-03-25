import React,{ useEffect,memo ,useState,useRef} from "react";
const GUseEffect = () => {
  const [user, setUser] = useState({userId:1});
  useEffect(() => {
    console.log("页面创建")  
    
  }, [])
  
  useEffect(() => {
    console.log("user",user)
    return () => {
      console.log("组件销毁",user)
    }
  }, [user])
  let i=useRef(1)
  const btnClick = () => {
    let user = {
      userId:i.current++
    }
    setUser(user)
  }
  return <button onClick={btnClick}>111</button>
}
export default memo(GUseEffect
)