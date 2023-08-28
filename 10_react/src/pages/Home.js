import React, { memo,useState,useReducer,useLayoutEffect ,useId, useEffect} from "react";
import Profile from "./Profile";
import Recommend from "./Recommend"
import { 
  HomeContext,
  DemonContext
} from "./context/homeContext";

function reducer(state,action){
  const type = action.type;
  switch(type){
    case "changeLina":
      return {...state,name:"李娜"};
    default:
      return state
  }
}
const Home = () => {
    const [message,setMsg] = useState("今天是个好日子");
    const [state,dispatch] = useReducer(reducer,{name:"lina"})
    const changeMsgHandler=()=>{
      console.log(Home)
      setMsg(message==="今天是个好日子"?"lina":"今天是个好日子");
    }
    const changeLina=()=>{
      dispatch({type:"changeLina"});
    }
  useLayoutEffect(() => {//该hook会阻塞dom渲染，在dom渲染之前执行回调
    if (message === "lina") {
      setMsg("gblina")
    }
  })
  let count = 0;
  function animate(time) {
    count++;
    if (count > 50) {
      return;
    }
    console.log(time)
    window.requestAnimationFrame(animate);
    return;
  }
  useEffect(() => {
    window.requestAnimationFrame(animate);
  },[])
  const id = useId();
  return (
    <DemonContext.Provider value={{ name:"lina"}}>
      <HomeContext.Provider value={{ name: "gb", age: 18 }}>
        {id}
        <Profile />
        <Recommend/>
          <div>
            {
              message
            }
          </div>
        <button onClick={()=>changeMsgHandler()}>
          修改message信息
        </button>
        <div>lina -{state.name}</div>
        <button onClick={()=>changeLina()}>changeLina</button>
      </HomeContext.Provider>
    </DemonContext.Provider>
  )
}
export default memo(Home);