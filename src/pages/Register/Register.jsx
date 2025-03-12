import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "../../styles/register.css"
import { signup } from '../../services/auth'
import useAuth from '../../hooks/useAuth'
import { useToast } from "../../context/ToastContext";

function Register() {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {auth,setAuth} = useAuth()
  const navigate = useNavigate()
  const { addToast } = useToast();

  useEffect(()=>{
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ username, email,password });
      setAuth({accessToken:response.data.accessToken})
      if (response.status >= 400 && response.status < 500) {
        addToast(response.data.message, "failure");
      }
      setAuth({accessToken:response.data.accessToken})
      navigate("../app");
 
    } catch (err) {
      if (err.response && err.response.status >= 400 && err.response.status < 500) {
        addToast(err.response.data.message, "failure");
      } else {    
        addToast("An unexpected error occurred. Please try again later", "failure");
      }
    }
  };

  return (
    <div className='register-wrapper'>
        <div className='register'>
            <h1>Sign Up </h1>
            <form className='register-form-content' onSubmit={(e)=>handleRegister(e)}>
            
              <div className='register-name'>
              <label htmlFor="username"><input placeholder='Enter your username' type="text" name="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} required/></label>
              <label htmlFor="email"><input placeholder='Enter your email' type="text" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}  required/></label>
              </div>
              <label htmlFor="password"><input placeholder='Enter your password' type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}  required /></label>
              <input type="submit" value="Sign Up"/>
            </form>
            <p>Already have an account? <Link to="../login">Login</Link></p>
            </div>
        </div>
  )
}

export default Register