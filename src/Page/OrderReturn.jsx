import React, { useContext, useEffect, useState } from 'react';
import './CSS/OrderReturn.css';
import { useLocation } from 'react-router-dom';
import { GoCheckCircle } from 'react-icons/go';
import { LiaTimesCircleSolid } from 'react-icons/lia';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const OrderReturn = () => {
    const location = useLocation();
    const [isOrderSuccess, setIsOrderSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const vnpStatus = params.get('vnp_TransactionStatus');
        const vnp_Amount = params.get('vnp_Amount');
        const paypalStatus = params.get('paypal_TransactionStatus');
        const momolStatus = params.get('paypal_TransactionStatus');
        const on_deliverylStatus = params.get('on_delivery_TransactionStatus');

        if (vnpStatus === '00' || paypalStatus === '00' || momolStatus === '00' || on_deliverylStatus === '00') {
            setIsOrderSuccess(true);
        } else {
            setIsOrderSuccess(false);
        }
    }, [location]);

    return (
        <div className="order-return">
            {isOrderSuccess ? (
                <div>
                    <div className="icon-success">
                        <GoCheckCircle />
                    </div>
                    <p>Đặt hàng thành công</p>
                    <div className="btn">
                        <button onClick={() => (window.location.href = '/my-order')}>Xem lại đơn hàng</button>
                        <button>Quay lại trang chủ</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="icon-error">
                        <LiaTimesCircleSolid />
                    </div>
                    <p>Giao dịch thất bại</p>
                    <div className="btn">
                        <button onClick={() => navigate('/cart')}>Thử lại</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderReturn;
