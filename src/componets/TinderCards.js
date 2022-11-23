import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import TinderCard from 'react-tinder-card'
import "./TinderCards.css"
import useWindowDimensions from "../hooks/useWindowDimensions"

import axios from "../axios"
function TinderCards() {
  const [person,setperson]=useState([])
  const [data,setData]=useState("h")
  const [name,setName]=useState("")
  console.log(localStorage.getItem("userId"));
  const { width, height } = useWindowDimensions();

  useEffect(() =>{
    async function fetchData(){
     
    
        const req=await axios.get("/tinder/cards")
        setperson(req.data?.filter(card=>card._id!==localStorage.getItem("userId")))
    

      
    }
    fetchData()
  },[])
  const outOfFrame=async(name,direction)=>{
    console.log(name.name +" left the screen");
    console.log('You swiped: ' + direction)

    // Steps
    // Check Right or left //done..
    // If Left then do nothing //done...
    // If Right Then
    // Check Swiped Member did actually swipe the right current user (yes or no)
    // if no then add/update in mongodb
    // if yes then
    // later........

   if(direction ==='right'){
          // alert("Match")
          await axios.post("/match",{
            _id:localStorage.getItem("userId"),
            MatchId:name._id
          }).then((data) => {
            console.log(data);
            setData(data.data)
            setName(name.name)
          }
          )
          //  localStorage.setItem(localStorage.getItem("userId"),localStorage.getItem(localStorage.getItem("userId"))name._id)
        }
  }
  const onSwipe = (direction) => {
    // console.log('You swiped: ' + direction)
  }

  
  return (
    <div className="TinderCards">
  {data!=="Hello"?  <div className="TinderCardsContainer">
      {person.map((item)=>(
        
       <TinderCard
       id={item._id}
       className='swipe'
       key={item.name}
       preventSwipe={["up","down"]}
       onSwipe={onSwipe}
       onCardLeftScreen={(dir)=>outOfFrame(item,dir)}
       >
          <div className="card" style={{
            backgroundImage:`url(${item.url})`,

          }} 
          
          >
          <h3 style={{margin:0, color:"white"}}>{item.name}</h3>
          </div>
       </TinderCard>
      ))}
      {data}
    </div>:
    <div style={{height:height,width:width,position: 'absolute',backgroundColor:"white",zIndex:3}}>
          
      <img src="https://res.cloudinary.com/dz7xfhqxk/image/upload/v1666170773/match_kmop9o.png" style={{ height:width<=425?height*0.25:width<=768?height*0.35:height*0.5,width:width<=768?width*0.9:width*0.5,marginLeft:width<=768?width*0.05:width*0.25,marginRight:width<=768?width*0.05:width*0.25}} />
      <div style={{ textAlign: 'center' }}>You and {name} liked each other</div>
      <button  style={{  color:"#fff",
   width: width<=768?width*0.6:width*0.18,
   padding:"10px",
   backgroundColor:"#fff",
   color:"#000",
   borderColor: "gray",
   borderRadius: "40px",
   marginTop:"20px",

   marginLeft:width<=768?width*0.2:width*0.41,marginRight:width<=768?width*0.2:width*0.41,
   /* padding: 5px !important; */
   overflow:  "hidden"}}>
        Send a message
      </button>
      <button  style={{  color:"#fff",
   width: width<=768?width*0.6:width*0.18,
   padding:"10px",
   backgroundColor:"#fff",
   color:"#000",
   borderColor: "gray",
   borderRadius: "40px",
   marginTop:"20px",

   marginLeft:width<=768?width*0.2:width*0.41,marginRight:width<=768?width*0.2:width*0.41,
   /* padding: 5px !important; */
   overflow:  "hidden"}}
   
   onClick={()=>setData("")}
   >
        Continue Swiping
      </button>
    </div>
    }

</div>
  )
}

export default TinderCards