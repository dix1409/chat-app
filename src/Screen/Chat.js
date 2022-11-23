import React from 'react'
import {useLocation} from 'react-router-dom'
import useWindowDimensions from "../hooks/useWindowDimensions"

import Left from '../componets/Left';
import { useState } from 'react';
import axios from "../axios"
import { useEffect } from 'react';
import Right from '../componets/Right';
function Chat() {

  const [msgId,setMsgId]=useState("")
  const[Message,setMessage]=useState([])
  const {width, height} =useWindowDimensions()

  useEffect(() => {
    if(msgId.length>0) {
    const fetchMessage=async()=>{

     const req=await axios.post("/sync/message",{"msgId":msgId})
     setMessage(req.data)
    }
    fetchMessage()
  }
  },[msgId])
    const {state}=useLocation()
    // console.log(state.data);
    const setId=(id)=>{
      setMsgId(id)
      }
    const postMessage=async(msg)=>{
      const req=await axios.post("/post/Message",{  "msg":msg,
      "userId":localStorage.getItem("userId"),
        "name":state.data.name,
        "timestamp":new Date().toISOString(),
        "msgId":msgId})
      setMessage([...Message,req.data])
    }




  return (
    <div className="chat" style={{backgroundColor:"#fe3c72",width:width,height:height,display:"flex",alignItems:"center",justifyContent:"center",margin:0,padding:0}}> 
    <div style={{backgroundColor:"#fff",width:width*0.8,height:height*0.90,flexDirection:"row",display:"flex"}} className="box">

      <Left data={state.data} setId={setId}/>
      <Right Message={Message} postMessage={postMessage}   />
    </div>
    </div>
  )
}

export default Chat