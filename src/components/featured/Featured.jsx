import React, { useState } from 'react';
import "./Featured.scss";
import img from "../../../src/img/search.png";
import manimg from "../../../src/img/man.png";
import { useNavigate } from 'react-router-dom';

const Featured = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const handleSearch = ()=>{
        navigate(`/gigs?search=${search}`);
    }

    return (
        <>
            <div className="featured">
                <div className="container">
                    <div className="left">
                        <h1>Find the perfect <span> freelance </span> services for your business </h1>
                        <div className="search">
                            <div className="searchInput">
                                <img src={img} alt="" />
                                <input type="text" name='search' placeholder='please type something' onChange={(e)=>setSearch(e.target.value)} />
                            </div>
                            <button onClick={handleSearch}>Search</button>
                        </div>
                        <div className="popular">
                            <span>Popular  :</span>
                            <button style={{cursor:'pointer'}} onClick={()=>navigate(`/gigs?category=design`)}>Web Design</button>
                            <button style={{cursor:'pointer'}} onClick={()=>navigate(`/gigs?category=development`)}>Development</button>
                            <button style={{cursor:'pointer'}} onClick={()=>navigate(`/gigs?category=Digital Marketing`)}>Marketing</button>
                            <button style={{cursor:'pointer'}} onClick={()=>navigate(`/gigs?category=`)}>All Services</button>
                        </div>
                    </div>
                    <div className="right">
                        <img src={manimg} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Featured