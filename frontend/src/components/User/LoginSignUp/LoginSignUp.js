import React, {  useRef,useState,useEffect } from "react";
import "./LoginSignUp.css";
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { clearError,  login, register } from "../../../redux/reducers/user/userReducer.js";
import {  toast } from 'react-toastify';
import Loader from "../../layout/Loader/Loader.jsx";
import { useLocation } from 'react-router-dom';



const LoginSignUp = () => {


    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/account";

    const {loading,isAuthenticated,message,error}=useSelector(state=>state.user)

    const loginTab=useRef(null)
    const registerTab=useRef(null)
    const switcherTab=useRef(null)

    const [loginEmail,setLoginEmail]=useState('')
    const [loginPassword,setLoginPassword]=useState('')
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
       
    })
    console.log(loginEmail)

    const {name,email,password}=user;
    const [avatar,setAvatar]=useState()
    const [avatarPreview,setAvatarPreview]=useState('/Profile.png')
 

    //gs11160963@gmail.com   password

    const loginSubmit = (e) => {
        e.preventDefault();
      
        // Dispatch the fetchUser action with email and password
        dispatch(login({email:loginEmail, password:loginPassword}));
      
      };

      useEffect(() => {
        if (message) {
          if (!error) {
            toast.success(message);
            dispatch(clearError());
          } else {
            toast.error(message);
          }
        }
        if (isAuthenticated) {
          navigate(redirect); // Redirect to /account if isAuthenticated is true
        }
      }, [message, error, dispatch, isAuthenticated, navigate,redirect]);


      const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
      
        if (!avatar) {
          const defaultAvatar = 'https://res.cloudinary.com/dfxipewhv/image/upload/v1705902256/avatars/ysqm8m0pni9ddhvnarhr.jpg'
          myForm.append("avatar", defaultAvatar);
        } else {
          myForm.append("avatar", avatar);
        }
        dispatch(register(myForm));
      };
      
      
    const registerDataChange = (e) => {
      if (e.target.name === "avatar") {
        const file = e.target.files[0]; // Get the selected file
    
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(file); // Set the file object in the state
          }
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
      } else {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    };
    

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab?.current?.classList.add("shiftToNeutral");
            switcherTab?.current?.classList.remove("shiftToRight");
    
            registerTab?.current?.classList.remove("shiftToNeutralForm");
            loginTab?.current?.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab?.current?.classList.add("shiftToRight");
            switcherTab?.current?.classList.remove("shiftToNeutral");
    
            registerTab?.current?.classList.add("shiftToNeutralForm");
            loginTab?.current?.classList.add("shiftToLeft");
        }
       
    };
    const adminPrefill1=()=>{
      setLoginEmail('gs11160963@gmail.com')
      setLoginPassword('password')
    }
    const adminPrefill2=()=>{
      setLoginEmail('gs11160963@gmail.com')
      setLoginPassword('12345678')
    }
    const userPrefill=()=>{
      setLoginEmail('govindsharma2839@gmail.com')
      setLoginPassword('password')
    }

  return (
    <>
     {loading ?<Loader/>:
     <>
     <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}> Login</p>
              <p onClick={(e) => switchTabs(e, "register")}> Register</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
                <LockOpenIcon/>
                <input type="password" placeholder="Password"  required value={loginPassword}
                     onChange={(e) => setLoginPassword(e.target.value)}
                />
            </div>
            <Link  to='/password/forgot' > Forget Password?</Link>
            
            <input type="submit" value='Login' className="loginBtn" />
            <button onClick={adminPrefill1} className="pre">Admin-P1 </button>
            <button onClick={adminPrefill2} className="pre">Admin-P1 </button>
            <button onClick={userPrefill} className="pre">User </button>
            <button></button>
          </form>
          <form className="signUpForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
          <div className="signUpName">
          <FaceIcon/>
          <input type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} />
          </div>
          <div className="signUpEmail">
            <MailOutlineIcon/>
            <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} />
          </div>
          <div className="signUpPassword">
            <LockOpenIcon/>
            <input type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange} />
          </div>
          <div className="registerImage">
            <img src={avatarPreview} alt="Avatar Preview" style={{height:'50px'}} />
            <input type="file" name="avatar" accept="image/*" onChange={registerDataChange} required/>
          </div>
          <input type="submit" value="Register" className="signUpBtn"/>
          </form>
        </div>
      </div>
     </>}
    </>
  );
};

export default LoginSignUp;
