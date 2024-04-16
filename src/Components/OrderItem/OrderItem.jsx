import React, { useState } from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import './OrderItem.css';

const OrderItem = ({ order }) => {
    const { id, total_amount, order_status, order_date, order_details } = order;
    const maxItemsToShow = 2;
    const [showAllItems, setShowAllItems] = useState(false);

    const toggleShowAllItems = (event) => {
        setShowAllItems(!showAllItems);
        event.stopPropagation();
    };

    const visibleItems = showAllItems ? order_details : order_details.slice(0, maxItemsToShow);
    const showMoreButton = !showAllItems && order_details.length > maxItemsToShow;

    const renderActionButton = () => {
        switch (order_status) {
            case 'pending':
                return <button className="cancel-btn">Hủy đơn</button>;
            case 'delivered':
                return <button className="review-btn">Đánh giá</button>;
            case 'cancelled':
                return <button className="reorder-btn">Mua lại</button>;
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
                                <p className="item-name">{detail.name}</p>
                                <p className="item-quantity">x{detail.quantity}</p>
                            </div>
                            <div className="price">
                                <p className="price-old">9.000.000.đ</p>
                                <p className="price-new">5.000.000.đ</p>
                            </div>
                        </div>
                    </div>
                ))}
                {showMoreButton && (
                    <div className="show-more-btn" onClick={toggleShowAllItems}>
                        <span>Xem thêm sản phẩm</span>
                        <MdKeyboardDoubleArrowRight />
                    </div>
                )}
            </div>
            <div className="bottom">
                <p className="total-amount">
                    Thành tiền: <span>5.000.000.đ</span>
                </p>
                {renderActionButton()}
            </div>
        </div>
    );
};

export default OrderItem;
