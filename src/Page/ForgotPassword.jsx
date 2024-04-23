import React, { useState } from 'react';
import './CSS/ForgotPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [res, setRes] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:1406/auth/forgot-password', { email });
            setRes(response.data);
        } catch (error) {
            setErrorMessage('Email chưa được đăng ký, vui lòng kiểm tra lại');
        }
    };

    return (
        <div className="signup">
            <div className="signup-container">
                {res.status === true ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '20px',
                        }}
                    >
                        <div style={{ marginTop: '20%' }}>Vui lòng kiểm tra email của bạn</div>
                    </div>
                ) : (
                    <>
                        <h2>Nhập email bạn đã đăng ký:</h2>
                        <div className="signup-form">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button onClick={handleSearch}>Xác nhận</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
