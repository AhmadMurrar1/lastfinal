// ImageSlider.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = ({ searchTerm }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backendfinal-c767.onrender.com/api/games/games?search=${searchTerm}`);
        if (response.data && response.data.length > 0) {
          setGames(response.data.slice(0, 2));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          adaptiveHeight: true,
        },
      },
    ],
  };

  return (
<div style={{ width: '100vw' }}>
  <Slider {...settings}>
    <div>
      <img src="https://i.postimg.cc/t4WFkyp9/DALL-E-2024-01-21-10-46-03-Create-a-wide-banner-image-for-Rent-Pro-emphasizing-width-The-banner.png" 
            alt="RentPro" 
            style={{ width: '100%', margin: 'auto', height: '45vh' }} />
    </div>
    <div>
      <img src="https://i.postimg.cc/W12f0D6G/DALL-E-2024-01-21-10-23-20-A-high-resolution-wide-banner-image-designed-for-a-screen-background.png" 
            alt="RentGame" 
            style={{ width: '100%', margin: 'auto', height: '45vh' }} />
    </div>
  </Slider>
</div>

  );
};

export default ImageSlider;
