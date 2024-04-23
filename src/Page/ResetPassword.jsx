import React, { useEffect, useState } from 'react';
import './CSS/ResetPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const queryString = window.location.search;
        const token = queryString.substring(queryString.indexOf('token=') + 6);
        setToken(token);
    });

    const handleChangePassword = async () => {
        if (password !== rePassword) {
            setErrorMessage('Mật khẩu mới không khớp');
        } else {
            try {
                const response = await axios.post('http://localhost:1406/auth/reset-password', {
                    token: token,
                    newPassword: rePassword,
                });
                if (response.data.status === true) {
                    setPassword('');
                    setRePassword('');
                    setSuccess(true);
                    toast.success('Thay đổi mật khẩu thành công');
                }
            } catch (error) {
                setErrorMessage('Đã xảy ra lỗi');
            }
        }
    };

    return (
        <div className="signup">
            <div className="signup-container">
                <h2>Tạo lại mật khẩu</h2>
                <div className="signup-form">
                    <input
                        type="text"
                        placeholder="Mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Xác nhận mật khẩu mới"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {/* <button onClick={handleChangePassword}>Đăng ký</button>
                <button onClick={handleChangePassword}>Đăng ký</button> */}
                {success ? (
                    <button style={{ backgroundColor: 'green' }} onClick={() => navigate('/login')}>
                        Quay lại đăng nhập
                    </button>
                ) : (
                    <button onClick={handleChangePassword}>Thay đổi mật khẩu</button>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
