import React from 'react';
import './Footer.css';
import footer_logo from '../../Assets/img/logo.png';
import instagram_icon from '../../Assets/img/iphone-logo.png';
import { FaInstagram } from 'react-icons/fa';
import { PiFacebookLogoBold } from 'react-icons/pi';
import { FaWhatsapp } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>Phonestore</p>
            </div>
            <div className="footer-links">
                <li>Công ty</li>
                <li>Sản phẩm</li>
                <li>Điều khoản</li>
                <li>Giới thiệu</li>
                <li>Liên hệ</li>
            </div>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <a href="https://www.facebook.com/luongvung247/" target="_blank" rel="noopener noreferrer">
                        <PiFacebookLogoBold size={40} />
                    </a>
                </div>
                <div className="footer-icons-container">
                    <a href="https://www.facebook.com/luongvung247/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={40} />
                    </a>
                </div>
                <div className="footer-icons-container">
                    <a href="https://www.facebook.com/luongvung247/" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp size={40} />
                    </a>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved</p>
            </div>
        </div>
    );
};

export default Footer;
