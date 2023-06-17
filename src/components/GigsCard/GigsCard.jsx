import React, { useEffect } from 'react';
import "./GigsCard.scss";


import star from "../../img/star.png";
import heart from "../../img/heart.png";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import nodp from "../../img/nodp.png";
import { serverUrl } from '../../utils/serverUrl';



const GigsCard = ({ item }) => {

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: [item.userId],
        queryFn: () =>
            axios.get(`${serverUrl}/api/users/${item.userId._id}`).then((res) => {
                return res.data;
            }),
    });



    return (
        <>  <div className="fragg">
            <Link to={`/gig/${item._id}`} className='link' >
                <div className="gigcard">
                    <div className="mobileimg">
                        <img src={item?.cover || heart} alt="" />
                        <div className="mobiletitle">
                                <p>{item?.title}</p>
                                <div className="star">
                                    <img src={star} alt="" />
                                    <span>{!isNaN(item?.totalStars / item?.starNumber) && Math.round(item?.totalStars / item?.starNumber)}</span>
                                </div>
                            </div>

                    </div>
                    <div className="mobile">
                        <div className="info">
                            {isLoading ? ("Loding....") : error ? ("something went wrong") : (<div className="user">
                                <img src={data?.img || nodp} alt="" />
                                <span>{data?.username}</span>

                            </div>)}
                            <div className="gigTitle">
                                <p>{item?.title}</p>
                                <div className="star">
                                    <img src={star} alt="" />
                                    <span>{!isNaN(item?.totalStars / item?.starNumber) && Math.round(item?.totalStars / item?.starNumber)}</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="detail">

                            <img src={heart} alt="" />

                            <div className="right">
                                <span>STARTING AT</span>
                                <h2>$  {item?.price}</h2>
                            </div>

                        </div>
                    </div>
                    <hr className='mobilehr'/>
                </div>
            </Link>
            </div>
        </>
    )
}

export default GigsCard