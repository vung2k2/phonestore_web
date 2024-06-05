import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomeProductList.css';
import HomeProductItem from '../HomeProductItem/HomeProductItem';
import { BsFire } from 'react-icons/bs';

const HomeProductList = ({ listProduct }) => {
    listProduct.sort((a, b) => b.numberReview - a.numberReview);
    const topProductsByReview = listProduct.slice(0, 10);

    const productsWithDiscount = listProduct.map((product) => {
        const discountRatio = product.oldPrice / product.newPrice;
        return { ...product, discountRatio };
    });
    productsWithDiscount.sort((a, b) => b.discountRatio - a.discountRatio);
    const topProductsByDiscount = productsWithDiscount.slice(0, 10);

    const xiaomiProducts = listProduct.filter((product) => product.category === 'xiaomi');

    const iphoneiProducts = listProduct.filter((product) => product.category === 'iphone');

    const viewedHistory = JSON.parse(localStorage.getItem('viewedHistory'));
    let viewedProducts = [];
    if (viewedHistory !== null) {
        viewedProducts = listProduct.filter((product) => viewedHistory.includes(product._id));
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        infinite: true,
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
                <Slider {...settings} autoplay={true} className="slick">
                    {topProductsByDiscount.map((product) => (
                        <HomeProductItem key={product._id} product={product} />
                    ))}
                </Slider>
            </div>{' '}
            <div className="list">
                <p>NỔI BẬT NHẤT</p>
                <Slider {...settings} className="slick">
                    {topProductsByReview.map((product) => (
                        <HomeProductItem key={product._id} product={product} />
                    ))}
                </Slider>
            </div>
            {viewedHistory !== null && viewedHistory.length >= 5 && (
                <div className="list">
                    <p>ĐÃ XEM GẦN ĐÂY</p>
                    <Slider {...settings} className="slick">
                        {viewedProducts.map((product) => (
                            <HomeProductItem key={product._id} product={product} />
                        ))}
                    </Slider>
                </div>
            )}
            <div className="list">
                <p>IPHONE</p>
                <Slider {...settings} className="slick">
                    {iphoneiProducts.map((product) => (
                        <HomeProductItem key={product._id} product={product} />
                    ))}
                </Slider>
            </div>{' '}
            <div className="list">
                <p>XIAOMI</p>
                <Slider {...settings} className="slick">
                    {xiaomiProducts.map((product) => (
                        <HomeProductItem key={product._id} product={product} />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default HomeProductList;
