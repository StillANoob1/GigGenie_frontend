import React from 'react';

import "./Slide.scss";

// import Slider from 'infinite-react-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Slide = ({ children }) => {
  var settings = {

    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1062,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          
        }
      },
      {
        breakpoint: 886,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        
        }
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  };
  return (
    <><div className="slide">
      <div className="container">
        <Slider {...settings}>
          {children}
        </Slider>
      </div>
    </div>
    </>
  )
}

export default Slide