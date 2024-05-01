import React, { useState, useContext, useEffect } from 'react';
import './Rate.css';
import { ShopContext } from '../../context/ShopContext';

const Rate = ({ id }) => {
    const [selectedStar, setSelectedStar] = useState('all');
    const [reviewsProduct, setReviewsProduct] = useState([]);
    const { getReviewsProduct } = useContext(ShopContext);

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

            {filterReviewsByStar(selectedStar).map((review) => (
                <div key={review.id}>
                    <p>Tên: {review.name}</p>
                    <p>Đánh giá: {review.rate}</p>
                    <p>Bình luận: {review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default Rate;
