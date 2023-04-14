import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import Loader from '../../components/loader/Loader';
import { serverUrl } from '../../utils/serverUrl';

import message from "../../img/message.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async() =>
     await axios.get(`${serverUrl}/api/orders`, {
        headers: {
          'Authorization': token
        }
      }).then((res) => {
        return res.data;
      })
  });

  const handleConversation = async (order) => {
    const id = order.sellerId + order.buyerId;
    try {
      const res = await axios.get(`${serverUrl}/api/conversations/single/${id}`, {
        headers: {
          'Authorization': token
        }
      }
      );
      navigate(`/message/${res?.data?.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await axios.post(`${serverUrl}/api/conversations`, {
          to: currentUser.isSeller ? order.buyerId : order.sellerId
        },
          {
            headers: {
              'Authorization': token
            }
          }
        );
        navigate(`/message/${res?.data?.id}`);

      }

    }
  }



  return (
    <div className="orders">
      {isLoading ? <Loader/> : error ? error.response?.data?.message : <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>}
            <th>Contact</th>
          </tr>
          {data.map((order) => {
            return <tr key={order._id}>
              <td>
                <img
                  className="image"
                  src={order.img}
                  alt=""
                />
              </td>
              <td>{order?.title}</td>
              <td>{order?.price}</td>
              <td>{ currentUser.isSeller? order?.buyerId : order?.sellerId }</td>
              <td>
                <img className="message" style={{cursor:"pointer"}} onClick={() => handleConversation(order)} src={message} alt="" />
              </td>
            </tr>
          })}
        </table>
      </div>}
    </div>
  );
};

export default Orders;