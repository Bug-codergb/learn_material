function foo(){
  var a=b=100;
}
foo();
console.log(b);
console.log(a);


import React, { memo, useRef, useEffect, useState, useMemo } from "react";
import { getRandom } from "../../utils/getRandom";
import moment from "moment";
import videoSrc from "../../assets/217b.mp4";
import { ChatWrapper } from "./style";
import { getRandomStr } from "../../utils/getRandomStr";
const Chat = () => {
  const [currentTime, setCurrentTime] = useState("");
  const contentRef = useRef();
  const screenRef = useRef();
  const [data, setData] = useState([
    {
      time: "02:11",
      text: "今天是个好日子",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:10",
      text: "宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:17",
      text: "哈哈哈哈哈哈哈哈",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:18",
      text: "一介书生。无路请缨，等终军之弱冠",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:51",
      text: "慕宗悫之长风。舍簪笏于百龄",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:23",
      text: "慕宗悫簪笏于百龄dsds",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "01:20",
      text: "慕宗悫簪笏于百龄111",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:19",
      text: "慕宗悫簪笏于百龄2",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "01:20",
      text: "慕宗悫簪笏于百龄3",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:02",
      text: "慕宗悫簪笏于百龄4",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:12",
      text: "慕宗悫簪笏于百龄6",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:03",
      text: "川泽纡其骇瞩。闾钟鸣鼎珠帘暮卷之舳。云销雨霁，彩彻区明。落霞鹜齐飞，秋水共长天一色。晚，蠡之滨；",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:04",
      text: "川泽纡其骇瞩。闾阎扑地食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响彭蠡之滨；",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:05",
      text: "川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙余报国一色。晚，响穷彭蠡之滨；",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:06",
      text: "穷；兴尽悲来，识盈虚之秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:07",
      text: "洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:21",
      text: "川泽纡其骇瞩。闾阎扑地宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:59",
      text: "川泽秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:03",
      text: "川泽纡其骇瞩。云销雨霁，彩与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:04",
      text: "川泽纡其骇瞩。云销雨霁，彩彻区明。落与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响gfdg穷彭蠡之滨；",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:05",
      text: "川泽纡其骇瞩。云销雨霁区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之fghf滨；",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:15",
      text: "隍枕夷夏之交，宾主尽东南",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:16",
      text: "隍登高作赋，是所望于群公。敢竭鄙怀南",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:17",
      text: "四美具，二难并。穷睇",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:18",
      text: "珠帘暮卷西山雨",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:27",
      text: "萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年？",
      isShow: false,
      contentRef: useRef(),
    },
    {
      time: "00:28",
      text: "阮籍猖狂，岂效穷途之哭！",
      isShow: false,
      contentRef: useRef(),
    },
  ]);

  const add = () => {
    console.log(currentTime);
    data.push({
      time: currentTime,
      text: "慕s宗s悫s簪ssssss笏s于s百龄" + new Date().getTime(),
      contentRef:contentRef,
      isShow:false
    });
    setData([...data]);
  };
  const time = (e) => {
    setCurrentTime(moment(e.currentTarget.currentTime * 1000).format("mm:ss"));
    for (let index in data) {
      let item = data[index];
      console.log(item.contentRef.current.offsetHeight,screenRef.current.offsetHeight);
      if (
        moment(e.currentTarget.currentTime * 1000).format("mm:ss") === item.time
      ) {
        let r = getRandom(
                          -screenRef.current.offsetHeight + index * item.contentRef.current.offsetHeight+item.contentRef.current.offsetHeight,
                          index * item.contentRef.current.offsetHeight);
        let anName = getRandomStr(10);
        let keyframes = `
        @keyframes ${anName}{
          0%{
            transform :translateX(0) translateY(${r}px);
          }  
          100%{
            transform :translateX(${screenRef.current.offsetWidth+30+item.contentRef.current.offsetWidth}px) translateY(${r}px);
          }
        }
        `;
        let style = document.createElement("style");
        style.innerHTML = keyframes;
        let head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
        item.contentRef.current.style.animation = `${anName} 16s normal`;
        item.contentRef.current.style.animationFillMode = `forwards`;
      }
    }
  };
  //style={item.isShow?{animation:'mymove 15s  normal','animation-fill-mode':'forwards'}:{}}
  const pauseHandle=(item)=>{
    item.contentRef.current.style.animationPlayState="paused"
  }
  const playHandle=(item)=>{
    item.contentRef.current.style.animationPlayState="running"
  }
  return (
    <ChatWrapper random={getRandom(10, 380)}>
      <div className="container">
        <div className="inner">
          <div className="start">
            <ul ref={contentRef}>
              {data &&
                data.map((item, index) => {
                  return (
                    <li key={item.text} className="text" ref={item.contentRef} onMouseEnter={e=>pauseHandle(item)} onMouseLeave={e=>playHandle(item)}>
                      {item.text}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="screen" ref={screenRef}></div>
          <div className="end"></div>
        </div>
      </div>
      <button onClick={(e) => add()}>+</button>
      <video
        src={videoSrc}
      /*   onPause={e=>pauseHandle()}
        onPlay={e=>playHandle()} */
        controls
        autoPlay
        onTimeUpdate={(e) => time(e)}
        muted
      />
    </ChatWrapper>
  );
};
export default memo(Chat);

import styled from "styled-components";
import { getRandom } from "../../utils/getRandom";
export const ChatWrapper = styled.div`
  margin:50px auto ;
  .container{
    height:400px;
    position:relative ;
    width:1100px;
    margin:0 auto ;
    /* overflow:hidden ; */
    .inner {
    display: flex;
    align-items:center ;
    height:100%;
    position: absolute;
    left:50% ;
    top:50% ;
    transform:translate(-50%,-50%) ;
    .screen {
      border: 1px solid #ec4141;
      width: 1100px;
      height: 100%;
      margin: 0 15px;
      background-color:skyblue;
    }
    .start,
    .end {
      width: 400px;
      background-color: pink;
      height: 100%;
    }
    .end{
      background-color:skyblue;
    }
    .start{
      display:flex ;
      justify-content:flex-end ;
      &>ul{
         display:flex ;
         flex-direction:column-reverse ;
         align-items:flex-end ;
        &>li{
          text-align:end ;
          list-style:none ;
          background-color:rgba(0,0,0,.2) ;
          border-radius:18px ;
          padding:5px 12px 8px 12px;
          color:#fff ;
        }
      }
    }
    .text {
      white-space: nowrap;
      color: #ec4141;
    }
  }
  }
  video {
    display:block ;
    width: 150px;
    height: 150px;
  }
`;

