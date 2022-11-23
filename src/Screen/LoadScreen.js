import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
function LoadScreen() {
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("userId")){
            navigate("/home")
        }else{
            navigate("/login")
        }
    },[])
  return (
    <div>LoadScreen</div>
  )
}

export default LoadScreen