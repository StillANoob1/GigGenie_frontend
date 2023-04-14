import React from 'react';
import "./Review.scss";

import star from "../../img/star.png";
import like from "../../img/like.png";
import dislike from "../../img/dislike.png";
import nodp from "../../img/nodp.png";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { serverUrl } from '../../utils/serverUrl';


const Review = ({item}) => {

    const{ data , isLoading, error } =useQuery({
        queryKey:[item.userId],
        queryFn: ()=>
        axios.get(`${serverUrl}/api/users/${item.userId}`).then((res)=>{
            return res.data;
        })
    })

    
    return (<>
        <div className="item">
           { isLoading?"loading..."  :error?error.message : <div className="user">
                <img
                    className="pp"
                    src={data?.img || nodp }
                    alt=""
                />
                <div className="info">
                    <span>{ data?.username }</span>
                    <div className="country">
                        <img
                            src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                            alt=""
                        />
                        <span>{ data?.country }</span>
                    </div>
                </div>
            </div>}
            { item?.star && <div className="stars">
            { Array(item?.star).fill().map((st,i)=>{
                return <img key={i}  src={star} alt="" />
            }) }
                <span>{ item?.star }</span>
            </div>}
            <p>
            { item?.desc }
            </p>
            <div className="helpful">
                <span>Helpful?</span>
                <img src={like} alt="" />
                <span>Yes</span>
                <img src={dislike} alt="" />
                <span>No</span>
            </div>
        </div>
        <hr />
    </>

    )
}

export default Review