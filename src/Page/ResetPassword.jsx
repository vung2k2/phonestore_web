import React, { useState } from 'react';
import './CSS/ResetPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        if (oldPassword === password) {
            setErrorMessage('Mật khẩu mới không được giống mật khẩu cũ');
        } else if (password !== rePassword) {
            setErrorMessage('Mật khẩu mới không khớp');
        } else if (oldPassword !== '123456789') {
            setErrorMessage('Mật khẩu không khớp trong email');
        } else {
            try {
                const response = await axios.post('http://localhost:1406/auth/change-password', {
                    email,
                    password: oldPassword,
                    newPassword: rePassword,
                });
                if (response.status === 200) {
                    setEmail('');
                    setPassword('');
                    setRePassword('');
                    setOldPassword('');
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
                        type="email"
                        placeholder="Email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Mật khẩu được cấp"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
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
                    <button onClick={handleChangePassword}>Đăng ký</button>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
