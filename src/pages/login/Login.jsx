import React, { useState } from 'react';
import "./Login.scss";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { serverUrl } from '../../utils/serverUrl';



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(`${serverUrl}/api/auth/login`, {
        email, password
      }, {
        withCredentials: true,
      })
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user))
      navigate("/");



    } catch (error) {
     toast.error(error.response.data.message);
     setLoading(false)
    }
  }

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit} >
          <h1>Sign In </h1>
          <label htmlFor="">Email</label>
          <input type="text" name='email' placeholder='Enter Your Email Address' onChange={(e) => setEmail(e.target.value)} required/>
          <label htmlFor="">Password</label>
          <input type="password" name='password' placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} required/>
          <button type='submit' disabled={loading} >Login</button>
        
        </form>
      </div>
    </>
  )
}

export default Login