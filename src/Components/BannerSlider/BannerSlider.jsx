import React from 'react';
import { Slide } from 'react-slideshow-image';
import './BannerSlider.css';
import slide1 from '../../Assets/img/slide1.webp';
import slide2 from '../../Assets/img/slide2.webp';
import slide3 from '../../Assets/img/slide3.webp';
import slide4 from '../../Assets/img/slide4.webp';
import slide5 from '../../Assets/img/slide5.webp';
import banner1 from '../../Assets/img/banner1.webp';
import banner2 from '../../Assets/img/banner2.jpg';
import banner3 from '../../Assets/img/banner3.jpeg';
import banner4 from '../../Assets/img/banner4.jpg';
import banner5 from '../../Assets/img/banner5.jpg';
import banner6 from '../../Assets/img/banner6.jpg';

const BannerSlider = () => {
    const slideImages = [slide1, slide2, slide3, slide4, slide5];

    const bannerImages2 = [banner1, banner2, banner3];
    const bannerImages1 = [banner4, banner5, banner6];

    return (
        <div className="banner-slider-container">
            <div className="banner-container">
                {bannerImages1.map((banner, index) => (
                    <div key={index} className="banner">
                        <img src={banner} alt={`Banner ${index + 1}`} />
                    </div>
                ))}
            </div>
            <div className="slider-container">
                <Slide
                    autoplay={true}
                    infinite={true}
                    indicators={true}
                    arrows={true}
                    duration={2000}
                    className="slider"
                >
                    {slideImages.map((slide, index) => (
                        <div key={index} className="each-slide" style={{ borderRadius: '0px' }}>
                            <img src={slide} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </Slide>
            </div>
            <div className="banner-container">
                {bannerImages2.map((banner, index) => (
                    <div key={index} className="banner">
                        <img src={banner} alt={`Banner ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;
