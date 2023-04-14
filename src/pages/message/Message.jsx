import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import "./Message.scss";
import nodp from "../../img/nodp.png";
import Loader from '../../components/loader/Loader';
import { serverUrl } from '../../utils/serverUrl';




const Message = () => {
  const queryClient=useQueryClient();
     const { id } = useParams();
     const currentUser =JSON.parse(localStorage.getItem("currentUser"))
  const token = localStorage.getItem("token");

  const { data, isLoading, error }= useQuery({
    queryKey:["messages"],
    queryFn:()=>
    axios.get(`${serverUrl}/api/messages/${id}`,{
      headers:{
        'Authorization':token
      }
    }).then((res)=>{
      return res.data;
    })
  });

  const mutation = useMutation({
    mutationFn: async (message)=>{
      return await axios.post(`${serverUrl}/api/messages`,message,{
        headers:{
          'Authorization':token
        }
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries([`messages`])
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message)
    }
  })

  const handleSend = (e)=>{
    e.preventDefault();
    mutation.mutate({
      conversationId:id,
      desc:e.target[0].value
    })

  }


  return (
    <>
      <div className="message">
        { isLoading? <Loader/> :error?"something went wrong": <div className="container">
          <span className="mes"><Link to="/messages">Messages</Link>  John Doe </span>
          <div className="messages">
          { data.map((m)=>{
            return <div className={ (currentUser._id === m?.userId)?"owner items" : "items"} key={m._id}>
          <img
              src={nodp}
              alt=""
            />
            <p> { m?.desc }</p>
          </div>
          }) }
          
          
          </div>
          <hr />
          <form className="write" onSubmit={handleSend}>
          <textarea name="sendmessage" id="" placeholder='write message here...' cols="30" rows="10"></textarea>
          <button type='submit'  disabled={mutation.isLoading}>Send</button>
          </form>
        </div>}
      </div>
    </>
  )
}

export default Message