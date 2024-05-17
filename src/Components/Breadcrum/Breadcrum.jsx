import React from 'react';
import './Breadcrum.css';
import { MdHome, MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Breadcrum = (props) => {
    const { product } = props;
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
        <div className="breadcrum">
            <MdHome color="#3d559d" size={23} />
            <Link
                style={{
                    textDecoration: 'none',
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#808080',
                }}
                to="/"
            >
                Trang chủ
            </Link>
            <MdArrowForwardIos color="#808080" />
            <Link
                style={{
                    textDecoration: 'none',
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#808080',
                }}
                to="/product"
            >
                Sản phẩm
            </Link>
            <MdArrowForwardIos color="#808080" />
            <Link
                style={{
                    textDecoration: 'none',
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#808080',
                }}
                to={`/product?brand=${product.category}`}
            >
                {capitalizeFirstLetter(product.category)}
            </Link>
            <MdArrowForwardIos color="#808080" />
            <Link
                style={{
                    textDecoration: 'none',
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#808080',
                    cursor: 'default',
                }}
                to={`/product/${product.slug}`}
            >
                {product.name}
            </Link>
        </div>
    );
};

export default Breadcrum;
