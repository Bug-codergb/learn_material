import React,{ useEffect,memo ,useState} from "react";
const GUseEffect = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    console.log("页面创建")  
  }, [])
  
  useEffect(() => {
    console.log("user")
  }, [user.userId])
  
  const btnClick = () => {
    user.userId="1212"
    setUser(user)
  }
  return <button onClick={btnClick}>111</button>
}
export default memo(GUseEffect
)