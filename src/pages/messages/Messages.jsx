import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import moment from "moment";
import Loader from '../../components/loader/Loader';
import { serverUrl } from '../../utils/serverUrl';

const Messages = () => {
  const queryClient = useQueryClient();
  const currentUser =JSON.parse(localStorage.getItem("currentUser"))
  const token = localStorage.getItem("token");

  const { data, isLoading,error } = useQuery({
    queryKey:["conversation"],
    queryFn:()=>
    axios.get(`${serverUrl}/api/conversations`,{
      headers:{
        'Authorization':token
      }
    }).then((res)=>{
      return res.data;
    })
  });
 
  const mutation = useMutation({
    mutationFn:(id)=>{
      return axios.put(`${serverUrl}/api/conversations/${id}`,id,{
        headers:{
          'Authorization':token
        }
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries([`conversation`])
    }
  })


  const handleRead = (id)=>{
    mutation.mutate(id);
  }


  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
       { isLoading? <Loader/> :error?error.response?.data?.message: <table>
          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          { data.map((c)=>{
            return <tr key={c._id} className={(( currentUser.isSeller && !c.readBySeller ) || (!currentUser.isSeller && !c.readByBuyer )) && "active"}>
            <td>{ currentUser.isSeller? c?.buyerId : c?.sellerId }</td>
            <td>
              <Link to={`/message/${c.id}`} className="link">
                {c?.lastMessage?.substring(0, 100)}...
              </Link>
            </td>
            <td>{ moment(c.updatedAt).fromNow() }</td>
            <td>
              { (( currentUser.isSeller && !c.readBySeller ) || (!currentUser.isSeller && !c.readByBuyer )) &&
                <button onClick={()=>handleRead(c.id)}>Mark as Read</button>}
            </td>
          </tr>
          }) }
          
          
          
          
        </table>}
      </div>
    </div>
  );
};

export default Messages;