import React, { useEffect, useState } from 'react'
import useWindowDimensions from "../hooks/useWindowDimensions"
import "./Left.css"
import axios from "../axios"
function Left(props) {
    const [match,setMatch]=useState([])
    const {width, height} =useWindowDimensions()
    // console.log(data);
    // console.log(props.setId);
    useEffect(()=>{

        const item=[]

     props.data.matched?.map((data)=>{
            
            axios.post("/check",{_id:data.id}).then(data=>{
              console.log(data.data);

                setMatch([...match,data.data])
            })
        })
      
    },[])




    // console.log(match);
  return (
    <div
    style={{height:"100%",width:"35%",borderRight: 1}}
className="left"
    >
    <div style={{width:"100%",height:"10%",backgroundColor:"#fff",display:"flex",alignItems:"center",flexDirection:"row"}} className="left-header">
    <img  src={props.data.ImageUrl} style={{width:50,height:50,borderRadius:25}}/>
    <h4>{props.data.name}</h4>
    </div>
    <p style={{color:"#FD297B",padding:0,marginVertical:"3px"}}>Messages</p>
    {match.map((item,index) =>(
       
        <button style={{width:"100%",height:"10%",backgroundColor:"#fff",display:"flex",alignItems:"center",flexDirection:"row"}} className="head" onClick={()=>props.setId(props.data.matched[index].msgId)}  >
    <img  src={item.ImageUrl} style={{width:50,height:50,borderRadius:25}}/>
    <h4>{item.name}</h4>
    </button>

        
   ) )}
    </div>
  )
}

export default Left