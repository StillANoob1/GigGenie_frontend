import React from 'react';
import { Link } from 'react-router-dom';
import "./CatCard.scss"

const CatCard = ({ item }) => {


    return (
        <Link to={`/gigs?category=${item?.title}`}>
            <div className="catCard">
                <img src={item.img} alt="" />
                <span className='title'>{item.title}</span>
                <span className='desc'>{item.desc}</span>

            </div>
        </Link>

    )
}

export default CatCard