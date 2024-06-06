import React, { useState, useContext, useEffect } from 'react';
import './Rate.css';
import { ShopContext } from '../../context/ShopContext';
import { PiUserCircleLight } from 'react-icons/pi';
import { FaExclamationCircle } from 'react-icons/fa';

const Rate = ({ id, start }) => {
    const [selectedStar, setSelectedStar] = useState('all');
    const [reviewsProduct, setReviewsProduct] = useState([]);
    const { getReviewsProduct, formatDateTime } = useContext(ShopContext);

    useEffect(() => {
        const fetchReviews = async () => {
            const reviews = await getReviewsProduct(id);
            setReviewsProduct(reviews);
        };
        fetchReviews();
    }, [id]);

    const filterReviewsByStar = (star) => {
        if (star === 'all') {
            return reviewsProduct;
        } else {
            return reviewsProduct.filter((review) => review.rate === star);
        }
    };

    const countReviewsByStar = (star) => {
        if (star === 'all') {
            return reviewsProduct.length;
        } else {
            return reviewsProduct.filter((review) => review.rate === star).length;
        }
    };

    return (
        <div className="rate">
            <h2>Đánh giá sản phẩm</h2>
            <p>
                {start} ★★★★★ <span>{countReviewsByStar('all')} đánh giá</span>
            </p>
            <div className="rate-category">
                <button onClick={() => setSelectedStar('all')} className={selectedStar === 'all' ? 'active' : ''}>
                    Tất cả ({countReviewsByStar('all')})
                </button>
                {[5, 4, 3, 2, 1].map((star) => (
                    <button
                        key={star}
                        onClick={() => setSelectedStar(star)}
                        className={selectedStar === star ? 'active' : ''}
                    >
                        {star} sao ({countReviewsByStar(star)})
                    </button>
                ))}
            </div>
            {filterReviewsByStar(selectedStar).length > 0 ? (
                filterReviewsByStar(selectedStar).map((review) => (
                    <div key={review._id} className="rate-el">
                        <div className="user-info">
                            <PiUserCircleLight className="user-icon" />
                            <span className="user-name">{review.userName}</span>
                        </div>
                        <div className="rating">{'★'.repeat(review.rate) + '☆'.repeat(5 - review.rate)}</div>
                        <div className="content">{review.comment}</div>
                        <div className="date">{formatDateTime(review.createdAt)}</div>
                    </div>
                ))
            ) : (
                <p style={{ fontSize: '20px', margin: '0', paddingTop: '100px', color: '#808080' }}>
                    <FaExclamationCircle style={{ marginRight: '4px' }} /> Chưa có đánh giá
                </p>
            )}
        </div>
    );
};

export default Rate;
