import React from 'react'
import { useState,useEffect } from 'react'
import classes from './login.module.css'
import {useDispatch} from 'react-redux'
import {Link, json, useNavigate} from 'react-router-dom'
import img from '../../assets/womaneating2.jpg'
import { login } from '../../redux/authSlice'
import {AiFillGoogleSquare} from "react-icons/ai"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') return;
  
    try {
      const res = await fetch(`http://localhost:4000/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      console.log(data);
      
      if (res.ok) {
        dispatch(login(data)); 
        navigate("/");
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
   


  const googleAuth = async () => {
    window.open(`https://benevolent-gumdrop-0cc445.netlify.app/auth/google/callback`, "_self");
  };
  
  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginWrapper}>
       
        <div className={classes.loginRightSide}>
          <h2 className={classes.title}>Login</h2>
          <form onSubmit={handleLogin} className={classes.loginForm}>
            <input type="email" placeholder='Type email' onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Type password' onChange={(e) => setPassword(e.target.value)}/>
            <button className={classes.submitBtn}>Login</button>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </form>
          <div className={classes.boootmSide}>
					<button className={classes.google_btn} onClick={googleAuth} >
						<AiFillGoogleSquare/>
						<span>Sing in with Google</span>
					</button>
          </div>
          </div>
					
          { error && <div className={classes.errorMessage}>
                 Wrong credentials! Try different ones
            </div>
          }
        </div>
    </div>
  )
}

export default Login
