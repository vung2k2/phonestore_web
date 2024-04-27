import React, { useState } from 'react';
import axios from 'axios'; // Import thư viện Axios
import './CSS/Signup.css';

import { toast } from 'react-toastify';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async () => {
        try {
            // Reset error message
            setErrorMessage('');

            // Check for empty fields
            if (!name || !email || !password) {
                setErrorMessage('Vui lòng nhập chính xác và đầy đủ thông tin.');
                return;
            } else if (password.length < 6) {
                setErrorMessage('Mật khẩu cần ít nhất 6 ký tự.');
                return;
            } else {
                const response = await axios.post('http://localhost:1406/auth/register', {
                    name,
                    email,
                    password,
                });
                if (response.status === 201) {
                    toast.success('Đăng ký tài khoản thành công');
                    setName('');
                    setEmail('');
                    setPassword('');
                }
            }
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error('Lỗi đăng ký:', error.response ? error.response.data : error.message);
            setErrorMessage('Đã xảy ra lỗi trong quá trình đăng ký.');
        }
    };

    return (
        <div className="signup">
            <div className="signup-container">
                <h1>Đăng ký</h1>
                <form className="signup-form">
                    <input type="text" placeholder="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type="text"
                        placeholder="Mật khẩu (Mật khẩu tối thiểu 6 ký tự)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button onClick={handleSignUp}>Đăng ký</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
