import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomeProductList.css';
import HomeProductItem from '../HomeProductItem/HomeProductItem';
import { BsFire } from 'react-icons/bs';

const HomeProductList = ({ listProduct }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Số sản phẩm hiển thị trong mỗi slide
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        swipeToSlide: true,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
        ],
    };

    return (
        <div className="home-product-list">
            <div className="list-sale">
                <p>
                    <BsFire style={{ fontSize: '40px', marginBottom: '-6px' }} /> HOT SALE GIÁ SỐC
                </p>
                <Slider {...settings} autoplay={true} infinite={true} className="slick">
                    {listProduct.map((product) => (
                        <HomeProductItem key={product.id} product={product} />
                    ))}
                </Slider>
            </div>{' '}
            <div className="list">
                <p>NỔI BẬT NHẤT</p>
                <Slider {...settings} className="slick">
                    {listProduct.map((product) => (
                        <HomeProductItem key={product.id} product={product} />
                    ))}
                </Slider>
            </div>{' '}
            <div className="list">
                <p>ĐÃ XEM GẦN ĐÂY</p>
                <Slider {...settings} className="slick">
                    {listProduct.map((product) => (
                        <HomeProductItem key={product.id} product={product} />
                    ))}
                </Slider>
            </div>
            <div className="list">
                <p>IPHONE</p>
                <Slider {...settings} className="slick">
                    {listProduct.map((product) => (
                        <HomeProductItem key={product.id} product={product} />
                    ))}
                </Slider>
            </div>{' '}
            <div className="list">
                <p>XIAOMI</p>
                <Slider {...settings} className="slick">
                    {listProduct.map((product) => (
                        <HomeProductItem key={product.id} product={product} />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default HomeProductList;
