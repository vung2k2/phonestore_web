import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import './CSS/Cart.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CHECK_OUT } from '../redux/reducers/checkout';
import { toast } from 'react-toastify';
import axios from 'axios';
import VNPay from '../Components/VNPay';
import Paypal from '../Components/Paypal';
import Momo from '../Components/Momo';
import Url from 'url';

const Cart = () => {
    const { cartItems } = useContext(ShopContext);
    const [currentUrl, setCurrentUrl] = useState('http://localhost:3000/cart');
    const [AmountVNP, setAmountVNP] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');

    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    const totalAmount = (arr) => {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i].newPrice * arr[i].productQuantity;
        }

        return total;
    };

    const createOrder = async (products, provider) => {
        try {
            const order = await axios.post(
                'http://localhost:1406/user/order',
                {
                    total_amount: AmountVNP,
                    provider: provider,
                    payment_status: 'pending',
                },
                {
                    headers: { 'Content-Type': 'application/json', AccessToken: accessToken },
                },
            );
            let order_id = order.data.insertId;
            for (let i = 0; i < products.length; i++) {
                await axios.post(
                    'http://localhost:1406/user/order-detail',
                    {
                        order_id: order_id,
                        productId: products[i].id,
                        quantity: products[i].productQuantity,
                        price: parseInt(parseInt(products[i].productQuantity) * parseInt(products[i].newPrice)),
                    },
                    {
                        headers: { 'Content-Type': 'application/json', AccessToken: accessToken },
                    },
                );
            }
            toast.success(`Thanh toán thành công qua ${provider}`);
            setTimeout(() => {
                navigate('/cart');
            }, 6000);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const vndToUsd = (vnd) => {
        const exchangeRate = 23000;
        return vnd / exchangeRate;
    };

    let amount = parseInt(vndToUsd(totalAmount(cartItems)));

    const getStatus = async (returnUrl) => {
        const queryString = returnUrl.split('?')[1];
        const params = new URLSearchParams(queryString);

        const resultCode = params.get('resultCode');
        // Lấy giá trị của vnp_ResponseCode
        const responseCode = params.get('vnp_ResponseCode');
        console.log(responseCode);
        if (typeof responseCode === 'string' && responseCode === '00' && resultCode === null) {
            await createOrder(cartItems, 'VNPay');
        }
        if (typeof resultCode === 'string' && resultCode === '0' && responseCode === null) {
            await createOrder(cartItems, 'Momo');
        } else {
            toast.error('Thanh toán thất bại');
        }
    };

    useEffect(() => {
        // Mã này sẽ được thực thi mỗi khi currentUrl thay đổi
        if (currentUrl !== 'http://localhost:3000/cart') {
            getStatus(currentUrl);
        }
    }, [currentUrl, AmountVNP]); // Theo dõi sự thay đổi của currentUrl

    useEffect(() => {
        // Lấy currentUrl khi component được render
        let currentUrl = window.location.href;
        setCurrentUrl(currentUrl);
    }, []);

    useEffect(() => {
        setAmountVNP(totalAmount(cartItems));
    }, [cartItems]);
    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="cart-empty-message">Không có sản phẩm nào trong giỏ hàng</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.imageUrl} alt={item.name} />
                            <div>
                                <p>{item.name}</p>
                                <p>{item.newPrice}</p>
                                <p>Quantity: {item.productQuantity}</p>
                            </div>
                        </div>
                    ))}
                    <h2>Tổng tiền: {formatCurrency(totalAmount(cartItems))}</h2>
                    <div className="paypal">
                        <Paypal
                            amount={amount}
                            payload={{
                                products: cartItems,
                                amount: amount,
                            }}
                        />
                    </div>
                    <div>
                        <VNPay total={totalAmount(cartItems)} />
                    </div>
                    <div>
                        <Momo total={totalAmount(cartItems) / 100} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
