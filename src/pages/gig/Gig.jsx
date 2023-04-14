import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import star from "../../img/star.png";

import greencheck from "../../img/greencheck.png";
import clock from "../../img/clock.png";
import recycle from "../../img/recycle.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
import { serverUrl } from "../../utils/serverUrl";
import { toast } from "react-hot-toast";

import nodp from "../../img/nodp.png";
import Loader from "../../components/loader/Loader";

function Gig() {

  const { id } = useParams();
  const navigate = useNavigate();


  const { data, isLoading, error } = useQuery({
    queryKey: [id],
    queryFn: () =>
      axios.get(`${serverUrl}/api/gigs/single/${id}`, {
        withCredentials: true,
      }).then((res) => {
        return res.data.gig
      })
  })


  const userId = data?.userId;
  const { data: dataUser, isLoading: loadindUser, error: errorUser } = useQuery({
    queryKey: [userId],
    queryFn: () =>
      axios.get(`${serverUrl}/api/users/${userId}`, {
        withCredentials: true
      }).then((res) => {
        return res.data;
      }),
    enabled: !!userId
  });

  const token = localStorage.getItem("token");

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await axios.post(`${serverUrl}/api/orders/${id}`, { id }, {
        headers:{
          'Authorization':token
        }
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      setTimeout(()=>{
        navigate("/orders")
      },2000)
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message)
    }
  })
  
 
  const handleOrder = () => {
    mutation.mutate(id);
   
    
  }
  

  return (
    <div className="gig">
      {isLoading ? <Loader/> : error ? "Something Went Wrong....." : <div className="container">
        <div className="left">
          <span className="breadcrumbs">GigGenie {">"} { data?.category } {">"} </span>
          <h1>{data?.title}</h1>
          {loadindUser ? "loading...." : errorUser ? "something went wrong" : <div className="user">
            <img
              className="pp"
              src={dataUser?.img || nodp}
              alt=""
            />
            <span>{dataUser?.username}</span>
            {!isNaN(Math?.round(data?.totalStars / data?.starNumber)) && <div className="stars">
              {/* { Array(Math?.round(data?.totalStars/data?.starNumber)).fill().map((item,i)=>{
              return <img key={i} src={star} alt="" />
            }) } */}
              <img src={star} alt="" />

              <span>{Math?.round(data?.totalStars / data?.starNumber)}</span>
            </div>}
          </div>}
          { (data?.images?.length > 0) && <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            {data?.images?.map((img) => {
              return <img key={img}
                src={img}
                alt=""
              />
            })}

          </Slider>}
          <h2>About This Gig</h2>
          <p>
            {data?.desc}
          </p>
          <div className="seller">
            <h2>About The Seller</h2>
            {loadindUser ? "loading...." : errorUser ? "something went wrong" : <div className="user">
              <img
                src={dataUser?.img || nodp}
                alt=""
              />
              <div className="info">
                <span>{dataUser?.username}</span>
                {!isNaN(Math?.round(data?.totalStars / data?.starNumber)) && <div className="stars">
                  {/* { Array(Math?.round(data?.totalStars/data?.starNumber)).fill().map((item,i)=>{
              return <img key={i} src={star} alt="" />
            }) } */}
                  <img src={star} alt="" />

                  <span>{Math?.round(data?.totalStars / data?.starNumber)}</span>
                </div>}
                <button>Contact Me</button>
              </div>
            </div>}
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc"> {dataUser?.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                { dataUser?.desc}
              </p>
            </div>
          </div>
          <Reviews gigId={id} />
        </div>
        <div className="right">
          <div className="price">
            <h3>{data?.shortTitle}</h3>
            <h2>$ {data?.price}</h2>
          </div>
          <p>
            {data?.shortDesc}
          </p>
          <div className="detailsss">
            <div className="item">
              <img src={clock} alt="" />
              <span>{data?.deliveryTimes} Days Delivery</span>
            </div>
            <div className="item">
              <img src={recycle} alt="" />
              <span>{data?.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="featuress">
            {data?.features.map((feature) => {
              return <div key={feature} className="featureitem">
                <img src={greencheck} alt="" />
                <span>{feature}</span>
              </div>
            })}

          </div>
          
          <button onClick={handleOrder}  disabled={mutation.isLoading}>Order</button>
        </div>

      </div>}
    </div>
  );
}

export default Gig;