import React, { useState, useEffect, useContext } from 'react';
import './Header.css';
import logo from '../../Assets/img/logo.png';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { ShopContext } from '../../context/ShopContext';

import Search from '../Search/Search';

const Header = () => {
    const [showLoginOptions, setShowLoginOptions] = useState(false);
    const [userName, setUserName] = useState('');
    const { cartItems, getTotalCartItems } = useContext(ShopContext);

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName && localStorage.getItem('refreshToken') && localStorage.getItem('accessToken')) {
            setUserName(storedUserName);
        }
    }, []);

    const toggleLoginOptions = () => {
        setShowLoginOptions(!showLoginOptions);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userName');
        setUserName(''); // Đặt userName về giá trị rỗng sau khi xóa
        window.location.href = '/';
    };

    return (
        <div className="header">
            <div className="header-logo">
                <Link className="header-logo" style={{ textDecoration: 'none', color: 'white' }} to="/">
                    <img src={logo} alt="" />
                    <p>Phonestore</p>
                </Link>
            </div>
            <Search />
            <ul className="header-menu">
                <li>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                        Trang chủ
                    </Link>
                </li>
                <li>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/product">
                        Sản Phẩm
                    </Link>
                </li>
                {userName ? (
                    <li className="account" onMouseEnter={toggleLoginOptions} onMouseLeave={toggleLoginOptions}>
                        <span>
                            {userName}
                            <RiArrowDropDownLine size={35} style={{ marginLeft: '-8px', marginTop: '2px' }} />
                        </span>
                        {showLoginOptions && (
                            <ul className="login-options" onClick={toggleLoginOptions}>
                                <li>
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                            marginLeft: '0px',
                                        }}
                                        to="/my-account"
                                    >
                                        Tài khoản
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                            marginLeft: '0px',
                                        }}
                                        to="/my-order"
                                    >
                                        Đơn mua
                                    </Link>
                                </li>
                                <li onClick={handleLogout}>Đăng xuất</li>
                            </ul>
                        )}
                    </li>
                ) : (
                    <li className="account" onMouseEnter={toggleLoginOptions} onMouseLeave={toggleLoginOptions}>
                        <span>
                            Tài khoản
                            <RiArrowDropDownLine size={35} style={{ marginLeft: '-8px', marginTop: '2px' }} />
                        </span>
                        {showLoginOptions && (
                            <ul className="login-options" onClick={toggleLoginOptions}>
                                <li>
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                            marginLeft: '0px',
                                        }}
                                        to="/login"
                                    >
                                        Đăng nhập
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                            marginLeft: '0px',
                                        }}
                                        to="/signup"
                                    >
                                        Đăng ký
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                )}
                <li className="cart">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/cart">
                        <AiOutlineShoppingCart className="cart-icon" />
                    </Link>
                    <div className="cart-count">{getTotalCartItems()}</div>
                </li>
            </ul>
        </div>
    );
};

export default Header;
