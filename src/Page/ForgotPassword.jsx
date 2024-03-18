import React, { useState } from 'react';
import './CSS/ForgotPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        // if (response.status === 200) {
        //     navigate('/reset-password');
        // } else if (response.status === 404) {
        //     setErrorMessage(response.statusText);
        // }
        try {
            const response = await axios.post('http://localhost:1406/auth/forgot-password', { email });
            if (response.status === 200) {
                navigate('/reset-password');
            }
        } catch (error) {
            setErrorMessage('Email chưa được đăng ký, vui lòng kiểm tra lại');
        }
    };

    return (
        <div className="signup">
            <div className="signup-container">
                <h2>Nhập email bạn đã đăng ký:</h2>
                <div className="signup-form">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>
        </div>
    );
};

export default ForgotPassword;
