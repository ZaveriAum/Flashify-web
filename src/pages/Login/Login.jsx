import React, { useState } from 'react'
import '../../styles/login.css'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/auth'
import useAuth from '../../hooks/useAuth'
import { useToast } from "../../context/ToastContext";

function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const { auth,setAuth } = useAuth();
  const navigate = useNavigate()
  const { addToast } = useToast();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response.status >= 400 && response.status < 500) {
        addToast("Invalid credentials. Please try again.", "failure");
      }
      setAuth({accessToken:response.data.accessToken})
      navigate("../app")
    } catch (err) {
      if (err.response && err.response.status >= 400 && err.response.status < 500) {
        addToast(err.response.data.message, "failure");
      } else {
        addToast("An unexpected error occurred. Please try again later", "failure");
      }
    }
  };


  return (
    <div className='login-wrapper'>
        <div className='login'>
            <h1>Log In</h1>
            <form className='login-form-content' onSubmit={(e)=>submitLogin(e)}>
              <div>
              <label htmlFor="email"><input placeholder='Enter your email' type="text" value={email} onChange={e=>{setEmail(e.target.value)}} name="email" id="email" /></label>
              <label htmlFor="password"><input placeholder='Enter your password' type="password" name="password" id="password"  value={password} onChange={e=>{setPassword(e.target.value)}}/></label>
              </div>
              <input type="submit" value="Log In" />
            </form>
            <p>Don' t have an account? <Link to="../register">Sign Up</Link></p>
        </div>
    </div>
  )
}

export default Login