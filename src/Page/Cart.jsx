import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import './CSS/Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(ShopContext);

    const getTotalPrice = (item) => {
        return item.newPrice * item.productQuantity;
    };

    return (
        <div className="cart-container">
            {cartItems.length === 0 ? (
                <p className="cart-empty-message">Không có sản phẩm nào trong giỏ hàng</p>
            ) : (
                <div>
                    <h2>Giỏ hàng</h2>
                    {cartItems
                        .slice()
                        .reverse()
                        .map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img className="cart-item-image" src={item.imageUrl} alt={item.name} />
                                <div className="cart-item-details">
                                    <p className="cart-item-name">{item.name}</p>
                                    <p className="cart-item-price">{item.newPrice}đ</p>
                                    <div className="cart-item-quantity">
                                        <button onClick={() => updateQuantity(item.id, item.productQuantity - 1)}>
                                            -
                                        </button>
                                        <p>{item.productQuantity}</p>
                                        <button onClick={() => updateQuantity(item.id, item.productQuantity + 1)}>
                                            +
                                        </button>
                                    </div>
                                    <p className="cart-item-total-price">Tổng giá: {getTotalPrice(item)}đ</p>
                                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    <div className="cart-summary">
                        <h3>Tổng cộng:</h3>
                        <p>{cartItems.reduce((total, item) => total + getTotalPrice(item), 0)}đ</p>
                        <Link to="/checkout" className="proceed-to-checkout">
                            Tiến hành thanh toán
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
