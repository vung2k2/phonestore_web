import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

// This value is from the props in the UI
const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, total, payload }) => {
    const { deleteCart, createOrder } = useContext(ShopContext);
    const navigate = useNavigate();

    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                currency: currency,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async (res) => {
            if (res.status === 'COMPLETED') {
                createOrder('paypal', payload.orderInfo);
            } else navigate('/order-return?paypal_TransactionStatus=01');
        });
    };

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}

            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, total]}
                fundingSource={'paypal'}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: total,
                                    currency_code: 'USD',
                                },
                            },
                        ],
                    });
                }}
                onApprove={onApprove}
            />
        </>
    );
};

export default function Paypal({ amount, payload }) {
    return (
        <div style={{ maxWidth: '750px', minHeight: '200px' }}>
            <PayPalScriptProvider
                options={{
                    clientId: 'AUGCHXATBYBadcVNAmAvhcN1IKYPJundB2JV1JutKbN8mvF0a-kDSeMtR91U9MVghRbFIX8x08-V9t91',
                    components: 'buttons',
                    currency: 'USD',
                }}
            >
                <ButtonWrapper currency={'USD'} total={amount} payload={payload} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}
