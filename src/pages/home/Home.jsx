import React from 'react';
import Featured from '../../components/featured/Featured';
import Slide from '../../components/slide/Slide';
import TrustedBy from '../../components/turestedBy/TrustedBy';
import "./Home.scss";
import CatCard from '../../components/catCard/CatCard';
import check from "../../../src/img/check.png"
import freelance from "../../../src/img/freelance.jpg"


import { cards } from "../../../src/data";
// import { projects } from "../../../src/data";
import ProCard from '../../components/proCard/ProCard';
import { useQuery } from '@tanstack/react-query';
import { serverUrl } from '../../utils/serverUrl';
import Loader from '../../components/loader/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const{ data, isError, isLoading} = useQuery({
    queryKey:["Gigs"],
    queryFn: () => 
    axios.get(`${serverUrl}/api/gigs`,{
      withCredentials:true,
    }).then((res)=>{
      return res.data.allGigs;
    })
  });
  return (
    <>
      <Featured />
      <TrustedBy />
      <Slide>
        {
          cards.map((item) => {
            { return <CatCard item={item} key={item.id} /> }
          })
        }
      </Slide>

      <div className="details">
        <div className="container">
          <div className="left">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <div className="icon">
                <img src={check} alt="" />
                <span>The best For Every budget</span>
              </div>
              <p>
                Find high quality services at every price point.
                no hourly rates, just project based pricing.
              </p>
            </div>
            <div className="title">
              <div className="icon">
                <img src={check} alt="" />
                <span>Quality work done quickly</span>
              </div>
              <p>
              Find the right freelancer to begin working on your project within minutes.
              </p>
            </div>
            <div className="title">
              <div className="icon">
                <img src={check} alt="" />
                <span>Protected payments, every time</span>
              </div>
              <p>
              Always know what you'll pay upfront. Your payment isn't released until you approve the work.
              </p>
            </div>
            <div className="title">
              <div className="icon">
                <img src={check} alt="" />
                <span>24/7 support</span>
              </div>
              <p>
              Questions? Our round-the-clock support team is available to help anytime, anywhere.
              </p>
            </div>
          </div>
          <div className="right">
            <img src={freelance} alt="" />
          </div>
        </div>
      </div>
      <div className="business">
        <div className="container">
          <div className="left">
            <h1>GigGenie business</h1>
            <h2>A business solution designed for teams</h2>
            <p>Upgrade to a curated exprience pack with tools
              and benifits, dedicated to business</p>
            <div className="icon">
              <img src={check} alt="" />
              <span>Connect to freelancer with proven business expirence</span>
            </div>
            <div className="icon">
              <img src={check} alt="" />
              <span>Get matched with the perfect talent by a customer success manager</span>
            </div>
            <div className="icon">
              <img src={check} alt="" />
              <span>Manage teamwork and boost productivity with one powerful workspace</span>
            </div>
            <button onClick={()=>navigate(`/gigs?category=`)}>Explore GigGenie Business</button>
          </div>
          <div className="right">
            <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png" alt="" />
          </div>
        </div>
      </div>
      <div className="proSlide">
        <Slide>
          
            {isLoading? <Loader/> : isError?"something went wrong ...":data?.map((item) => {
              return <ProCard item={item} key={item._id} />
            })
          }
        </Slide>
      </div>

    </>
  )
}

export default Home