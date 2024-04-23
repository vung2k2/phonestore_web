import React, { useState, useContext } from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import './OrderItem.css';
import { ShopContext } from '../../context/ShopContext';
import { Button } from '@mui/material';

const OrderItem = ({ order }) => {
    const { CancelOrder, addToCart } = useContext(ShopContext);
    const { id, total_amount, status, order_date, order_details } = order;
    const maxItemsToShow = 2;
    const [showAllItems, setShowAllItems] = useState(false);

    const toggleShowAllItems = (event) => {
        setShowAllItems(!showAllItems);
        event.stopPropagation();
    };

    const handleCancel = () => {
        const isConfirmed = window.confirm('Bạn có chắc muốn hủy đơn hàng này không?');
        if (isConfirmed) {
            // Gọi hàm hủy đơn hàng khi xác nhận từ người dùng
            CancelOrder(id);
        }
    };
    const handleReorder = () => {
        order_details.map((product) => addToCart(product.id, product.quantity));
    };

    const visibleItems = showAllItems ? order_details : order_details.slice(0, maxItemsToShow);
    const showMoreButton = !showAllItems && order_details.length > maxItemsToShow;

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
                                    {status === 'completed' && <button className="review-btn">Đánh giá</button>}
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
                {showMoreButton && (
                    <div className="show-more-btn" onClick={toggleShowAllItems} style={{ cursor: 'pointer' }}>
                        <span>Xem thêm sản phẩm</span>
                        <MdKeyboardDoubleArrowRight />
                    </div>
                )}
            </div>
            <div className="bottom">
                <p className="total-amount">
                    Thành tiền: <span>{total_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'}</span>
                </p>
                {renderActionButton()}
            </div>
        </div>
    );
};

export default OrderItem;
