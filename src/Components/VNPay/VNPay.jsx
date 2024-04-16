import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import vnpay_logo from '../../Assets/img/vnpay-logo.png';

const VNPayy = ({ total }) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        const response = await axios.post(
            'http://localhost:1406/user/payment',
            {
                total: total,
            },
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
