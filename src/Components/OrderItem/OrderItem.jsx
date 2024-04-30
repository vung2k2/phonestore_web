import React, { useState, useContext, useEffect } from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import './OrderItem.css';
import { ShopContext } from '../../context/ShopContext';
import { Button } from '@mui/material';
import ProductReviews from '../ProductReviews/ProductReviews';

const OrderItem = ({ order }) => {
    const { CancelOrder, addToCart } = useContext(ShopContext);
    const { id, total_amount, orderInfo, status, order_date, order_details, provider } = order;

    const maxItemsToShow = 2;
    const [showDetails, setShowDetails] = useState(false);
    const [showProductReviews, setShowProductReviews] = useState(false);
    const [productRv, setProductRv] = useState({});
    useEffect(() => {
        document.body.style.overflow = showProductReviews ? 'hidden' : 'unset';
        // Thiết lập lại trạng thái ngăn cuộn khi component bị hủy
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showProductReviews]);

    const toggleshowDetails = (event) => {
        setShowDetails(!showDetails);
        event.stopPropagation();
    };

    const handleCancel = () => {
        const isConfirmed = window.confirm(
            'Bạn có chắc muốn hủy đơn hàng này không?\nChúng tôi sẽ liên hệ cho bạn qua sđt đặt hàng để tiến hành hoàn tiền(nếu đã thanh toán).',
        );
        if (isConfirmed) {
            // Gọi hàm hủy đơn hàng khi xác nhận từ người dùng
            CancelOrder(id);
        }
    };
    const handleReorder = () => {
        order_details.map((product) => addToCart(product.id, product.quantity));
    };

    const visibleItems = showDetails ? order_details : order_details.slice(0, maxItemsToShow);

    const renderActionButton = () => {
        switch (status) {
            case 'pending':
                return (
                    <button className="cancel-btn" onClick={handleCancel}>
                        Hủy đơn
                    </button>
                );
            case 'completed':

            case 'cancelled':
                return (
                    <button className="reorder-btn" onClick={handleReorder}>
                        Mua lại
                    </button>
                );
            default:
                return null;
        }
    };
    return (
        <div className="order-item">
            <div className="top">
                <p className="order-id">Mã đơn #{id}</p>
                <p className="order-date">Ngày đặt: {new Date(order_date).toLocaleDateString()}</p>
            </div>
            <div className="main">
                {visibleItems.map((detail, index) => (
                    <div key={index} className="order-item-detail">
                        <img src={detail.imageUrl} alt={detail.name} />
                        <div className="item-info">
                            <div>
                                <p className="item-name">
                                    {detail.name}
                                    {status === 'completed' && detail.rating === null && (
                                        <button
                                            className="review-btn"
                                            onClick={() => {
                                                setShowProductReviews(true);
                                                setProductRv(detail);
                                            }}
                                        >
                                            Đánh giá
                                        </button>
                                    )}
                                </p>
                                <p className="item-quantity">x{detail.quantity}</p>
                            </div>

                            <div className="price">
                                <p className="price-old">
                                    {detail.oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'}
                                </p>
                                <p className="price-new">
                                    {detail.newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {!showDetails && (
                    <div className="show-more-btn" onClick={toggleshowDetails} style={{ cursor: 'pointer' }}>
                        <span>Xem chi tiết</span>
                        <MdKeyboardDoubleArrowRight />
                    </div>
                )}
                {showDetails && (
                    <div className="more-detail">
                        <p className="provider">
                            Phương thức than toán:{' '}
                            <span>{provider === 'on_delivery' ? 'Thanh toán khi nhận hàng' : provider}</span>
                        </p>

                        <p className="delivery-address">
                            Địa chỉ nhận hàng: <span>{orderInfo}</span>
                        </p>
                    </div>
                )}
            </div>
            <div className="bottom">
                <p className="total-amount">
                    Thành tiền: <span>{total_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'}</span>
                </p>
                {renderActionButton()}
            </div>
            {showProductReviews && <ProductReviews onClose={() => setShowProductReviews(false)} product={productRv} />}
        </div>
    );
};

export default OrderItem;
