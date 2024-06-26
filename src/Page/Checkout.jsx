import React from 'react';
import { useSelector } from 'react-redux';
import './CSS/Checkout.css';
import Paypal from '../Components/Paypal';
import VNPay from '../Components/VNPay';

const Checkout = () => {
    const checkoutItems = useSelector((state) => state.checkoutItems);
    let [items] = checkoutItems.cartItems;
    // const [amount, setAmount] = useState('');

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

    let amount = parseInt(vndToUsd(totalAmount(items)));

    return (
        <>
            <div className="cart-container">
                <h1>Shopping Cart</h1>
                {items.length > 0 ? (
                    <>
                        <div>
                            {items.map((item) => (
                                <div className="cart-item" key={item._id}>
                                    <img src={item.imageUrl} alt={item.name} />
                                    <div>
                                        <p>{item.name}</p>
                                        <p>{formatCurrency(item.newPrice)}</p>
                                        <p>Quantity: {item.productQuantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h2>Tổng tiền: {formatCurrency(totalAmount(items))}</h2>

                        <div className="paypal">
                            <Paypal
                                amount={amount}
                                payload={{
                                    products: items,
                                    amount: amount,
                                }}
                            />
                        </div>
                        <div>
                            <VNPay total={totalAmount(items)} />
                        </div>
                    </>
                ) : (
                    <div className="cart-empty-message">Không có sản phẩm nào trong giỏ hàng</div>
                )}
            </div>
        </>
    );
};

export default Checkout;
