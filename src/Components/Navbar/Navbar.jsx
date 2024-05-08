import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import samsung_logo from '../../Assets/img/samsung-logo.png';
import iphone_logo from '../../Assets/img/iphone-logo.png';
import all_logo from '../../Assets/img/all-logo.png';
import masstel_logo from '../../Assets/img/masstel-logo.png';
import oppo_logo from '../../Assets/img/oppo-logo.jpg';
import vivo_logo from '../../Assets/img/vivo-logo.png';
import xiaomi_logo from '../../Assets/img/xiaomi-logo.png';
import other_logo from '../../Assets/img/other-logo.png';

const Navbar = ({ handleBrandClick }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedBrand = searchParams.get('brand');
    const [activeBrand, setActiveBrand] = useState(selectedBrand);
    console.log(selectedBrand);
    const navigate = useNavigate();
    const handleBrand = (brand) => {
        setActiveBrand(brand);
        handleBrandClick(brand);
        if (brand === null) {
            navigate('/product');
        } else {
            navigate(`/product?brand=${brand}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-menu">
                <div className="navbar-item">
                    <img
                        src={all_logo}
                        onClick={() => handleBrand(null)}
                        alt=""
                        className={`brand-logo ${activeBrand === null ? 'active' : ''}`}
                    />
                </div>
                <div className="navbar-item">
                    <img
                        src={iphone_logo}
                        onClick={() => handleBrand('iphone')}
                        alt=""
                        className={`brand-logo ${activeBrand === 'iphone' ? 'active' : ''}`}
                    />
                </div>
                <div className="navbar-item">
                    <img
                        src={samsung_logo}
                        onClick={() => handleBrand('samsung')}
                        alt=""
                        className={`brand-logo ${activeBrand === 'samsung' ? 'active' : ''}`}
                    />
                </div>

                <div className="navbar-item">
                    <img
                        src={xiaomi_logo}
                        onClick={() => handleBrand('xiaomi')}
                        alt=""
                        className={`brand-logo ${activeBrand === 'xiaomi' ? 'active' : ''}`}
                    />
                </div>
                <div className="navbar-item">
                    <img
                        src={oppo_logo}
                        onClick={() => handleBrand('oppo')}
                        alt=""
                        className={`brand-logo ${activeBrand === 'oppo' ? 'active' : ''}`}
                    />
                </div>
                <div className="navbar-item">
                    <img
                        src={vivo_logo}
                        onClick={() => handleBrand('vivo')}
                        alt=""
                        className={`brand-logo ${activeBrand === 'vivo' ? 'active' : ''}`}
                    />
                </div>
                <div className="navbar-item">
                    <img
                        src={masstel_logo}
                        onClick={() => handleBrand('masstel')}
                        alt=""
                        className={`brand-logo ${activeBrand === 'masstel' ? 'active' : ''}`}
                    />
                </div>
                <div className="navbar-item">
                    <img
                        src={other_logo}
                        onClick={() => handleBrand('other')}
                        alt=""
                        className={`brand-logo ${activeBrand === 'other' ? 'active' : ''}`}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
