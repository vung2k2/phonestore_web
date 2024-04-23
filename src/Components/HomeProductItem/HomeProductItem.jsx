import React, { useRef } from 'react';
import './HomeProductItem.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

const HomeProductItem = ({ product }) => {
    const { imageUrl, name, oldPrice, newPrice, rate, numberReview } = product;
    //Ngăn click khi kéo chuột
    const state = useRef({ x: 0 });
    const handleMouseDown = (e) => {
        state.current.x = e.screenX;
    };
    const handleClick = (e) => {
        const delta = Math.abs(e.screenX - state.current.x);

        if (delta > 10) {
            e.preventDefault();
        }
    };
    return (
        <div className="home-product-item">
            <Link
                style={{ textDecoration: 'none' }}
                to={`/product/${product.slug}`}
                className="product-link"
                onMouseDown={handleMouseDown}
                onClick={handleClick}
            >
                <div className="image-wrapper">
                    <LazyLoadImage className="image" src={imageUrl} width={250} height={250} alt={name} />
                </div>
            </Link>
            <div className="info">
                <Link style={{ textDecoration: 'none' }} to={`/product/${product.slug}`} className="product-link">
                    <div className="name">{name}</div>
                    <div className="prices">
                        <span className="new-price">{newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}.đ</span>

                        <span className="old-price">
                            {oldPrice.toString().length >= 8
                                ? oldPrice
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                      .substring(0, 6) + '...'
                                : oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '.đ'}
                        </span>

                        <span className="discount">-{Math.floor((1 - newPrice / oldPrice) * 100)}%</span>
                    </div>
                    <div className="rating">
                        <span className="rating-stars">★ {rate}</span>
                        <span className="rating-count">({numberReview})</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default HomeProductItem;
