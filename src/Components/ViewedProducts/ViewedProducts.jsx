import React, { useContext } from 'react';

import './ViewedProducts.css';
import { IoCloseSharp } from 'react-icons/io5';

const ViewedProducts = ({ viewedProducts, setShowViewedProducts }) => {
    const handleClose = () => {
        setShowViewedProducts(false);
    };
    return (
        <div className="viewed-products">
            <IoCloseSharp className="close-icon" onClick={handleClose} />
            <h2>Sản phẩm đã xem gần đây:</h2>
            <ul>
                {viewedProducts.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewedProducts;
