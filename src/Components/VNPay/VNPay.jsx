import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useHistory } from 'react-router-dom';
import vnpay_logo from '../../Assets/img/vnpay-logo.png';

const VNPayy = ({ OrderInfo }) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/user/payment`,
            { OrderInfo: OrderInfo },
            {
                headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
            },
        );
        window.location.href = response.data;
    };

    return (
        <div
            style={{
                width: '350px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ccc',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
        >
            <img style={{ width: '100px' }} onClick={handleClick} src={vnpay_logo} alt="" />
        </div>
    );
};

export default VNPayy;
