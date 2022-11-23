import React, { useEffect, useState } from 'react'
import { GoogleLogin,GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import "./Login.css"
import useWindowDimensions from "../hooks/useWindowDimensions"
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '@material-ui/icons//Facebook';
import axios from "../axios"
import {useNavigate} from 'react-router-dom'
function Login() {
    const [ profile, setProfile ] = useState({});
    const [url,setUrl] = useState("")
    const { width, height } = useWindowDimensions();
    const navigate=useNavigate()
    const clientId="55669825587-874ovehoub6ttvjh3b8ct2hb8jsk2tq1.apps.googleusercontent.com"
    useEffect(() => {
        const initClient = () => {
              gapi.client.init({
              clientId: clientId,
              scope: ''
            });
         };
         gapi.load('client:auth2', initClient);
         
     },[]);
     
     const onSuccess = (res) => {
       if(!localStorage.getItem("userId")){

        console.log(res.profileObj);
        setProfile(res.profileObj);
        fetch("https://source.unsplash.com/random/400×400/?user").then((response) => {
                    
            axios.post("/login/user",{...res.profileObj,ImageUrl:response.url}).then((data)=>{
                axios.post("/tinder/cards",{
                    _id:data.data._id,
                    name:res.profileObj.name, 
                    url:response.url
                })
                localStorage.setItem("userId",data.data._id)
                localStorage.setItem(data.data._id,[data.data._id])
                navigate("/home")
            })
                 })
                }

    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };
    // const logOut=() => {
    //     setProfile(null);
    // }
    console.log(height);
    const responseFacebook = (response) => {
        console.log(response);
      }
    return (
    
        <div className="Login" style={{width:width,height:height,position: 'fixed',display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',backgroundColor: "rgba(0,0,0,0.9)"}}> 
        <img src={"https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.jpg"} style={{opacity: 0.2,  width: "100%",height: "auto"}}  alt="tinder"  />
        <div className="Box" style={{width:width>768?width*0.3:width,height:width>768?height*0.8:height,backgroundColor:"white",position: 'absolute',display:'flex',flexDirection: 'column',alignItems: 'center'}}>
        <img src="https://res.cloudinary.com/dz7xfhqxk/image/upload/v1665759790/image-removebg-preview_yqocrw.png" className="image" alt="tinder" />
         <h3>GET STARTED</h3>
         <p style={{maxWidth:width<=768?width*0.4:width*0.2,textAlign: 'center',fontSize:16}}>By Clicking the button you agree to the terms and conditions of the tindr website</p>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                // style={{}}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                className="btn"
            />
            <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      className="btn"
      onLogoutSuccess={()=>localStorage.removeItem("userId")}
    ></GoogleLogout>
             <FacebookLogin
    appId="1373306646534477"
    autoLoad={true}
    buttonStyle={{alignItems:"center",display:"flex",   color:"#fff",
   width: width<=768?width*0.6:width*0.18,
   padding:"10px",
   backgroundColor:"#fff",
   color:"#000",
   borderColor: "gray",
   borderRadius: "40px",
   marginTop:"20px",
   /* padding: 5px !important; */
   overflow:  "hidden"}}
    className="btn"
    fields="name,email,picture"
    // onClick={componentClicked}
    cssClass="my-facebook-button-class"
    icon={<FacebookIcon color='blue' />}
    callback={responseFacebook} />
    <button className="btn" style={{backgroundColor:"white",padding:"10px",color:"black",  marginTop:"20px",}} >
    Login With Phone Number
    </button>
        </div>
     
    </div>
);
  
}

export default Login