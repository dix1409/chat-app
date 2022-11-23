import React from 'react'
import { useState } from 'react';
import "./Right.css"
function Right({Message,postMessage}) {
    const [msg,setmsg]=useState("")
  console.log(Message);
  return (
    <div style={{height:"100%",width:"65%",overflow:"hidden",backgroundColor:"#f2f2f2"}}>
    <div style={{height:"92%",display:"flex",justifyContent:"flex-end",flexDirection:"column",width:"100%"}}>

       {Message?.map((item)=>(
        <><div style={{padding:15,height:30,backgroundColor:"#fff",marginBottom:10}} className={item.userId===localStorage.getItem("userId")?"msg":"msg receiver"}>
          <p style={{fontSize:10,margin:0,padding:0}}> {item.name}</p> 
          <p style={{margin:0,padding:0}}>
          {item.msg}
          </p>
         </div></>
       ))}
    </div>
  

    <div style={{width:"100%",height:40,display:"flex",alignItems:"center",flexDirection:"row"}}> 
   <input placeholder='Send a Message' style={{width:"85%",height:"100%",borderRadius:25,paddingLeft:15}} onChange={(event) =>setmsg(event.target.value)} onSubmit={()=>postMessage(msg)} />
    <button onClick={()=>postMessage(msg)}>
        Send
    </button>
    </div>

    </div>
  )
}

export default Right