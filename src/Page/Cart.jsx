import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import './CSS/Cart.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CHECK_OUT } from '../redux/reducers/checkout';

const Cart = () => {
    const { cartItems } = useContext(ShopContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCheckout = () => {
        dispatch({ type: CHECK_OUT, payload: cartItems });
        navigate('/checkout', { state: { cartItems: cartItems } });
    };

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
                    <button onClick={handleCheckout} className="proceed-to-checkout">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
