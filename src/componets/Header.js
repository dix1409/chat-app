import React, { useEffect, useState } from 'react'
import "./header.css"
import PersonIcon from '@material-ui/icons/Person';
import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../axios"
export default function Header() {
  const[user,setUser]=useState({})
  useEffect(async() =>{
    const fetchData=async()=>{

     const req=await axios.post("/check",{_id:localStorage.getItem("userId")})
     setUser(req.data)
      console.log(user);
    } 
    fetchData()
  },[])
  const navigate=useNavigate()
  return (
    <div className="HeaderContainer" >
    <div className="Header">

<IconButton   onClick={()=>navigate("/login")}>
{/* <Link to="login"> */}

    <PersonIcon fontSize="large"/>

</IconButton>

    <img src="https://res.cloudinary.com/dz7xfhqxk/image/upload/v1665759790/image-removebg-preview_yqocrw.png" className="image" alt="tinder" />
    <IconButton>

    <ChatIcon fontSize='large' onClick={()=>navigate("/chat",{state:{data:user}})} />
</IconButton>
    </div>
   </div>
  )
}

