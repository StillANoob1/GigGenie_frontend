import React from 'react';
import "./Footer.scss";

// social media logo import
import twitter from "../../img/twitter.png";
import facebook from "../../img/facebook.png";
import linkdn from "../../img/linkedin.png";
import pintrst from "../../img/pinterest.png";
import instagram from "../../img/instagram.png";
import language from "../../img/language.png";
import coin from "../../img/coin.png";
import access from "../../img/accessibility.png";







const Footer = () => {
  return (
   <>
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="categories">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Business</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>
          <div className="categories">
            <h2>About</h2>
            <span>Careers</span>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Investor Relations</span>
            <span>Terms of Service</span>
            
          </div>
          <div className="categories">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on GigGenie</span>
            <span>Buying on GigGenie</span>
          </div>
          <div className="categories">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Community Hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standardsn</span>
          </div>
          <div className="categories">
            <h2>More From GigGenie</h2>
            <span>GigGenie Business</span>
            <span>GigGenie Pro</span>
            <span>GigGenie Logo Maker</span>
            <span>GigGenie Guidesn</span>
            <span>Get Inspired</span>
            <span>GigGenie Select</span>
            <span>GigGenie Workspace</span>
            
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h1>GigGenie</h1>
            <span>@GigGenie international Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src={twitter} alt="" />
              <img src={facebook} alt="" />
              <img src={linkdn} alt="" />
              <img src={pintrst} alt="" />
              <img src={instagram} alt="" />
            </div>
            <div className="bot">
            <div className="language">
            <img src={language} alt="" />
            <span>English</span>
            </div>
            <div className="usd">
            <img src={coin} alt="" />
            <span>USD</span>
            
            </div>
            <img src={access} alt="" />
          </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Footer