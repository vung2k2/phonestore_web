import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import './CSS/Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CHECK_OUT } from '../redux/reducers/checkout';
import { toast } from 'react-toastify';
import axios from 'axios';
import VNPay from '../Components/VNPay';
import Paypal from '../Components/Paypal';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdRemove } from 'react-icons/io';
import { IoMdAdd } from 'react-icons/io';
import TextField from '@mui/material/TextField';
import { IoIosArrowBack } from 'react-icons/io';
import Loading from '../Components/Loading/Loading';
import SelectAddress from '../Components/SelectAddress/SelectAddress';
import cart_empty_icon from '../Assets/img/cart_empty.png';

const Cart = () => {
    const { cartItems, setCartItems, removeFromCart, changeQuantityItem, createOrder } = useContext(ShopContext);
    const [AmountVNP, setAmountVNP] = useState(0);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const [isLoading, setIsLoading] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const timeoutRef = useRef(null);

    const handleQuantityChange = (productId, change) => {
        const newCart = cartItems.map((item) => {
            if (item.id === productId) {
                const newQuantity = item.productQuantity + change;
                // Kiểm tra điều kiện trước khi cập nhật số lượng
                if (newQuantity >= 1 && newQuantity <= item.quantity) {
                    return { ...item, productQuantity: newQuantity };
                }
            }
            return item;
        });
        setCartItems(newCart);

        // Hủy bỏ timeout hiện tại (nếu có)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Thiết lập timeout mới để gửi yêu cầu API sau 1 giây
        timeoutRef.current = setTimeout(() => {
            setIsLoading(true);
            changeQuantityItem(productId, newCart.find((item) => item.id === productId).productQuantity)
                .then(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 300);
                })
                .catch(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 3000);
                });
        }, 500);
    };

    // Xóa timeout khi component bị unmount để tránh lỗi
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const [userName, setUserName] = useState(
        localStorage.getItem('userName') === null || localStorage.getItem('userName') === 'undefined'
            ? ''
            : localStorage.getItem('userName'),
    );

    const [userPhoneNumber, setUserPhoneNumber] = useState(
        localStorage.getItem('userPhoneNumber') === 'null' || localStorage.getItem('userPhoneNumber') === 'undefined'
            ? ''
            : localStorage.getItem('userPhoneNumber'),
    );
    const [userAddress, setUserAddress] = useState(
        localStorage.getItem('userAddress') === 'null' || localStorage.getItem('userAddress') === 'undefined'
            ? ''
            : localStorage.getItem('userAddress'),
    );

    const handleAddressSelect = (address) => {
        setUserAddress(address);
        localStorage.setItem('userAddress', address);
        setIsEditingAddress(false);
    };

    const handleEditAddress = () => {
        setIsEditingAddress((prevState) => !prevState);
    };

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

    const vndToUsd = (vnd) => {
        const exchangeRate = 23000;
        return vnd / exchangeRate;
    };

    let amount = parseInt(vndToUsd(totalAmount(cartItems)));

    useEffect(() => {
        setAmountVNP(totalAmount(cartItems));
    }, [cartItems]);
    return (
        <div className="cartitems">
            <Loading isLoading={isLoading} />
            {cartItems.length === 0 ? (
                // <p className="cartitems-empty-message">Không có sản phẩm nào trong giỏ hàng</p>
                <div className="cart_empty">
                    <img src={cart_empty_icon}></img>
                </div>
            ) : (
                <div className="cartitems-container">
                    <Link
                        to="/product"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '10px 0px 10px 170px',
                            textDecoration: 'none',
                            color: 'blue',
                            fontSize: '16px',
                        }}
                    >
                        <IoIosArrowBack style={{ marginRight: '2px' }} />
                        Mua thêm sản phẩm khác
                    </Link>
                    <div className="cartitems-main">
                        <div className="cartitems-left">
                            <div style={{ padding: '10px 0 0 10px' }} className="cartitems-left-format-main">
                                <p>Điện thoại</p>
                                <p>Số lượng</p>
                                <p>Tổng tiền</p>
                                <p>Xóa</p>
                            </div>
                            <hr />

                            {cartItems
                                .slice()
                                .reverse()
                                .map((product) => (
                                    <div key={product.id}>
                                        <div className="cartitems-left-format cartitems-left-format-main">
                                            <div className="cartitems-info">
                                                <Link
                                                    style={{ textDecoration: 'none' }}
                                                    to={`/product/${product.slug}`}
                                                >
                                                    <img src={product.imageUrl} className="product-img" alt="" />
                                                </Link>
                                                <div className="product-name-price">
                                                    <div className="name">{product.name}</div>
                                                    <div className="price">
                                                        <div className="new-price">
                                                            {product.newPrice
                                                                .toString()
                                                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '.đ'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cartitems-quantity">
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, -1)}
                                                    disabled={product.productQuantity <= 1}
                                                >
                                                    <IoMdRemove size={20} />
                                                </button>
                                                <input
                                                    type="text"
                                                    className="cartitems-quantity-value"
                                                    maxLength={3}
                                                    value={product.productQuantity}
                                                    readOnly
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, 1)}
                                                    disabled={product.productQuantity >= product.quantity}
                                                >
                                                    <IoMdAdd size={20} />
                                                </button>
                                            </div>

                                            <p className="cartitems-price-total">
                                                {(product.newPrice * product.productQuantity)
                                                    .toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '.đ'}
                                            </p>
                                            <RiDeleteBin6Line
                                                className="cartitems-remove-icon"
                                                size={25}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => removeFromCart(product.id)}
                                            />
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                        </div>
                        <div className="cartitems-right">
                            <div className="customer-info">
                                <h2>Thông tin khách hàng</h2>
                                <div>
                                    <TextField
                                        id="user-name"
                                        label="Họ tên"
                                        variant="outlined"
                                        defaultValue={userName}
                                        error={userName === ''}
                                        helperText={userName === '' && 'Vui lòng nhập họ tên'}
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            setUserName(value);
                                        }}
                                        style={{ marginBottom: '20px' }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="user-phone-number"
                                        label="Số điện thoại"
                                        variant="outlined"
                                        defaultValue={userPhoneNumber}
                                        error={userPhoneNumber === ''}
                                        helperText={userPhoneNumber === '' && 'Vui lòng nhập số điện thoại'}
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            setUserPhoneNumber(value);
                                        }}
                                    />
                                </div>

                                <div className="address">
                                    <p>
                                        <i>
                                            <b>Địa chỉ: </b>
                                        </i>
                                        {'     '}
                                        {userAddress}
                                        <span
                                            onClick={handleEditAddress}
                                            style={{
                                                color: 'blue',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                marginLeft: '6px',
                                            }}
                                        >
                                            Sửa
                                        </span>
                                    </p>
                                    {isEditingAddress && <SelectAddress onSelect={handleAddressSelect} />}
                                </div>
                            </div>
                            <div className="pay">
                                <h2>
                                    Tổng tiền:{' '}
                                    <span style={{ color: 'red' }}>{formatCurrency(totalAmount(cartItems))}</span>
                                </h2>
                                <div className="paypal" style={{ height: '45px' }}>
                                    <Paypal
                                        amount={amount}
                                        payload={{
                                            products: cartItems,
                                            amount: amount,
                                            orderInfo: `${userName} - ${userPhoneNumber} - ${userAddress}`,
                                        }}
                                    />
                                </div>
                                <div className="vnpal">
                                    <VNPay OrderInfo={`${userName} - ${userPhoneNumber} - ${userAddress}`} />
                                </div>
                                <div style={{ padding: '20px 0 5px 0' }}>
                                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#454545' }}>Hoặc</span>
                                </div>
                                <div className="on_delivery">
                                    <button
                                        onClick={() =>
                                            createOrder(
                                                'on_delivery',
                                                `${userName} - ${userPhoneNumber} - ${userAddress}`,
                                            )
                                        }
                                    >
                                        Thanh toán khi nhận hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
