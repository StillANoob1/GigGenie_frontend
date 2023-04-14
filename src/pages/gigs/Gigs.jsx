import React, { useEffect, useRef, useState } from 'react';
import "./Gigs.scss";
import down from "../../img/down.png";
import GigsCard from '../../components/GigsCard/GigsCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { serverUrl } from '../../utils/serverUrl';
import Loader from "../../components/loader/Loader"


const Gigs = () => {
  const minRef = useRef();
  const maxRef = useRef();

  const {search} = useLocation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  
  

  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");

 const{ data, isError, isLoading, refetch } = useQuery({
    queryKey:["Gigs"],
    queryFn: () => 
    axios.get(`${serverUrl}/api/gigs${search}&min=${minRef.current.value}&max=${maxRef.current?.value}&sort=${sort}`,{
      withCredentials:true,
    }).then((res)=>{
      return res.data.allGigs;
    })
  });

  useEffect(() => {
    refetch();
  }, [sort,category])
  

 
  const sortBy = (type) => {
    setSort(type)
    setOpen(false)

  }
  const apply = () =>{
    refetch();
  }


  return (
    <>

      <div className="gigs">
        <div className="container">
          <p>GigGenie {">"}       { category? category :    "All Gigs" } </p>
          <h1>{  category? category :    "All Gigs"   }</h1>
          <p className='p'>Explore the boundries of art and technology with GigGenie's AI artists</p>
          <div className="bottom">
            <div className="left">
              <span>Budget</span>
              <input ref={minRef} type="number" placeholder='min' />
              <input ref={maxRef} type="number" placeholder='max' />
              <button onClick={apply}>Apply</button>
            </div>
            <div className="right">
              <span className="sort">SortBy : </span>
              <span className="sell">{sort === "sales" ? "Best Selling" : sort === "popular"? "Popular":"newest"}</span>
              <img src={down} alt="" onClick={() => setOpen(!open)} />
              {open && (<div className="options">
                {sort !== "createdAt" && <span onClick={() => sortBy("createdAt")}>Newest</span>}
                {sort !== "sales" && <span onClick={() => sortBy("sales")}>Best Selling</span>}
                {sort !== "popular" && <span onClick={() => sortBy("popular")}>Popular</span>}
              </div>)}
            </div>
          </div>
          <div className="cards">
            {isLoading? <Loader/> : isError?"something went wrong ...": data.map((item) => {
              return <GigsCard item={item} key={item._id} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Gigs