import React, { useContext, useState } from 'react';
import './ProductReviews.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ShopContext } from '../../context/ShopContext';
import Rating from '@mui/material/Rating';
const ProductReviews = ({ onClose, orderId, product }) => {
    const { ratingProduct } = useContext(ShopContext);
    const [value, setValue] = useState(5);
    const [comment, setComment] = useState('');
    const getValueDescription = (value) => {
        switch (value) {
            case 1:
                return 'Tệ';
            case 2:
                return 'Không hài lòng';
            case 3:
                return 'Bình thường';
            case 4:
                return 'Hài lòng';
            case 5:
                return 'Rất tuyệt';
            default:
                return 'Chưa chọn số sao';
        }
    };
    return (
        <>
            <div className="backdrop" onClick={onClose}></div>
            <div className="product-reviews">
                <AiOutlineCloseCircle
                    style={{ cursor: 'pointer' }}
                    onClick={onClose}
                    className="close-popup"
                    size={30}
                    color="#808080"
                />
                <div className="product-reviews-main">
                    <h2>Đánh giá sản phẩm</h2>
                    <div className="product-info">
                        <img src={product.imageUrl} alt="" />
                        <p>{product.name}</p>
                    </div>
                    <div className="rating">
                        <p>Chất lượng sản phẩm</p>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            size="large"
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <p style={{ fontSize: '20px', paddingLeft: '10px', color: 'rgb(237, 165, 0)' }}>
                            {getValueDescription(value)}
                        </p>
                    </div>
                    <div className="cmt">
                        <textarea
                            rows="4"
                            cols="50"
                            placeholder="Hãy viết gì đó..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ resize: 'none' }}
                        ></textarea>
                    </div>
                    <div className="btn">
                        <button
                            onClick={() => {
                                ratingProduct(orderId, product._id, value, comment);
                                onClose();
                            }}
                        >
                            Hoàn tất
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductReviews;
