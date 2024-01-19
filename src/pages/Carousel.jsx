import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src="https://i.pinimg.com/564x/0e/b0/21/0eb0215173fe97602df134546b6dcca1.jpg" alt="Image 1" />
        </div>
        <div>
          <img src="https://i.pinimg.com/564x/10/13/5e/10135edf1389783a663ba2bd63d9ce3b.jpg" alt="Image 2" />
        </div>
        <div>
          <img src="https://i.pinimg.com/564x/de/ab/93/deab9384d68c50bca6527d540b5b3d33.jpg" alt="Image 3" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
