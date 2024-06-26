import React, { useState, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './ProductItem.css'; // Import CSS file
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { toast } from 'react-toastify';

const ProductItem = ({ product }) => {
    const { imageUrl, name, oldPrice, newPrice, rate, numberReview, quantity } = product;

    const { addToCompareList, removeFromCompareList, compareList, addToCart } = useContext(ShopContext);

    const [isCompared, setIsCompared] = useState(compareList.some((item) => item._id === product._id));

    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCompare = () => {
        if (isCompared) {
            removeFromCompareList(product._id);
            setIsCompared(!isCompared);
        } else if (!isCompared && compareList.length < 3) {
            addToCompareList(product);
            setIsCompared(!isCompared);
        } else {
            toast.warning('Danh sách đã đầy!');
        }
    };

    const handleAddToCart = async () => {
        setIsLoading(true);
        await addToCart(product._id, 1);
        setIsLoading(false);
    };

    return (
        <div className="product-card">
            <Link style={{ textDecoration: 'none' }} to={`/product/${product.slug}`} className="product-link">
                <div className="product-card-image-wrapper">
                    <LazyLoadImage className="product-card-image" src={imageUrl} width={250} height={250} alt={name} />
                </div>
            </Link>
            <div className="product-card-info">
                <Link style={{ textDecoration: 'none' }} to={`/product/${product.slug}`} className="product-link">
                    <div className="product-card-name">{name}</div>
                    <div className="product-card-prices">
                        <span className="product-card-new-price">
                            {newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}.đ
                        </span>

                        <span className="product-card-old-price">
                            {oldPrice.toString().length >= 8
                                ? oldPrice
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                      .substring(0, 6) + '...'
                                : oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '.đ'}
                        </span>

                        <span className="product-card-discount">-{Math.floor((1 - newPrice / oldPrice) * 100)}%</span>
                    </div>
                    <div className="product-card-rating">
                        <span className="product-card-rating-stars">
                            ★ {rate ? (rate / numberReview).toFixed(1) : 0}
                        </span>
                        <span className="product-card-rating-count">({numberReview})</span>
                    </div>
                </Link>
                <div>
                    <span className="product-card-compare" onClick={handleAddToCompare}>
                        {isCompared ? '✓ Đã thêm vào so sánh' : '+ So sánh'}
                    </span>
                </div>
                <div className="product-card-actions">
                    {product.quantity > 0 ? (
                        <button className="product-card-action-button" onClick={handleAddToCart} disabled={isLoading}>
                            {isLoading ? <span className="loader-add-product"></span> : 'Thêm vào giỏ hàng'}
                        </button>
                    ) : (
                        <button className="product-card-action-button-disabled" disabled>
                            Đã hết hàng
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
