import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Momo = ({ total }) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        const response = await axios.post('http://localhost:1406/user/momo-pay', {
            total: total,
        });
        window.location.href = response.data;
    };

    return (
        <div>
            <button onClick={handleClick}>Thanh toán qua Momo</button>
        </div>
    );
};

export default Momo;
