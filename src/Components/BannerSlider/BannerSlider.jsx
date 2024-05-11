import React from 'react';
import { Slide } from 'react-slideshow-image';
import './BannerSlider.css';

const BannerSlider = () => {
    const slideImages = [
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/vivo-v29e-sliding-th333.png',
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/infinix-hot-40-sliding-0111.jpg',
    ];

    const slideName = [''];

    const bannerImages = [
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-banner-ipad-gen9-new-th2.jpg',
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-banner-ipad-gen9-new-th2.jpg',
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-banner-ipad-gen9-new-th2.jpg',
    ];

    return (
        <div className="banner-slider-container">
            <div className="banner-container">
                {bannerImages.map((banner, index) => (
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
                {bannerImages.map((banner, index) => (
                    <div key={index} className="banner">
                        <img src={banner} alt={`Banner ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;
