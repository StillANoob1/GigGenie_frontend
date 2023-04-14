import React from 'react';
import "./ProCard.scss";
import { useQuery } from '@tanstack/react-query';
import { serverUrl } from '../../utils/serverUrl';
import axios from 'axios';
import { Link } from 'react-router-dom';
import nodp from "../../img/nodp.png"

const ProCard = ({item}) => {
  const { data} = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
        axios.get(`${serverUrl}/api/users/${item.userId}`).then((res) => {
            return res.data;
        }),
});

  return (<>
    <Link to={`/gig/${item._id}`} className='link' >
    <div className="proCard">
    <img src={item?.cover} alt="" />
    <div className="sec">
        <img src={data?.img || nodp} alt="" />
        <div className="title">
            <h3>{item?.category}</h3>
            <span>{data?.username}</span>
        </div>
    </div>
    </div>
    </Link>
    </>
  )
}

export default ProCard