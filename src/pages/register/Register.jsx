import React, { useState } from 'react';
import "./Register.scss";
import axios from 'axios';
import upload from '../../utils/upload';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast";
import { serverUrl } from '../../utils/serverUrl';

const Register = () => {

  const [file, setFile] = useState("");

  const [user, setUser] = useState({
    username:"",
    email:"",
    password:"",
    img:"",
    country:"",
    isSeller:false,
    phone:"",
    desc:"",
  });
 
const navigate = useNavigate();

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setUser((prev)=>{
      return { ...prev, [name]:value  }
    }
    )
  }
  const handleSeller=(e)=>{
    setUser((prev)=>{
      return{ ...prev, isSeller:e.target.checked }
    })

  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
   

    const url =await upload(file);
    try {
      const res = await axios.post(`${serverUrl}/api/auth/register`,{
        ...user,
        img:url,
      },{
        withCredentials:true
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user))
      navigate("/");

    } catch (err) {
      toast.error(err.response.data.message)
    }
  }



  return (
    <div className="register">
    <form onSubmit={handleSubmit}>
      <div className="left">
        <h1>Create a new account</h1>
        <label htmlFor="">Username</label>
        <input
        value={user.username}
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={handleChange}
          required
        />
        <label htmlFor="">Email</label>
        <input
        value={user.email}
          name="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
          required
        />
        <label htmlFor="">Password</label>
        <input name="password" type="password" onChange={handleChange} value={user.password} required />
        <label htmlFor="">Profile Picture</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <label htmlFor="">Country</label>
        <input
          name="country"
          type="text"
          placeholder="Usa"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </div>
      <div className="right">
        <h1>I want to become a seller</h1>
        <div className="toggle">
          <label htmlFor="">Activate the seller account</label>
          <label className="switch">
            <input type="checkbox" onChange={handleSeller} />
            <span className="slider round"></span>
          </label>
        </div>
        <label htmlFor="">Phone Number</label>
        <input
          name="phone"
          type="text"
          placeholder="+1 234 567 89"
          onChange={handleChange}
        />
        <label htmlFor="">Description</label>
        <textarea
          placeholder="A short description of yourself"
          name="desc"
          id=""
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>
      </div>
    </form>
  </div>
  )
}

export default Register