import React, { useContext } from 'react';
import './ViewedProducts.css';
import { ShopContext } from '../../context/ShopContext';
import { IoCloseSharp } from 'react-icons/io5';

const ViewedProducts = ({ viewedProducts, setShowViewedProducts }) => {
    const { addToCompareList } = useContext(ShopContext);

    const handleClose = () => {
        setShowViewedProducts(false);
    };

    return (
        <div className="viewed-products">
            <IoCloseSharp className="close-icon" onClick={handleClose} />
            <h2>Điện thoại đã xem gần đây</h2>
            <ul className="product-list">
                {viewedProducts.map((product) => (
                    <li
                        key={product._id}
                        className="product-item"
                        onClick={() => {
                            addToCompareList(product);
                            handleClose();
                        }}
                    >
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <span className="product-name">{product.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewedProducts;
