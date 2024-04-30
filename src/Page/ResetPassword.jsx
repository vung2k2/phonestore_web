import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showRepassword, setShowRepassword] = useState(false);
    const [token, setToken] = useState('');
    const [show, setShow] = useState(false);
    const [response, setResponse] = useState(false);
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
                    setResponse(true);
                    setPassword('');
                    setRePassword('');
                    toast.success('Thay đổi mật khẩu thành công');
                }
            } catch (error) {
                setResponse(false);
                setErrorMessage('Đã xảy ra lỗi');
            }
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                marginTop: '150px',
                border: '1px solid lightgray',
                borderRadius: '10px',
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {response === true ? (
                <>
                    <>
                        <Typography sx={{ textAlign: 'center' }}>Thành công</Typography>
                        <CheckIcon
                            sx={{
                                marginTop: '25px',
                                marginBottom: '25px',
                                color: 'blue',
                                fontSize: '50px',
                            }}
                        />
                        <Button onClick={() => navigate('/login')} variant="outlined">
                            Quay về đăng nhập
                        </Button>
                    </>
                </>
            ) : (
                <>
                    <Typography sx={{ textAlign: 'center', fontSize: '18px' }}>Tạo lại mật khẩu</Typography>

                    <TextField
                        size="small"
                        type={show ? 'text' : 'password'}
                        placeholder="Mật khẩu mới"
                        fullWidth
                        autoComplete="new-password"
                        sx={{ margin: '15px 0px', fontSize: '15px', position: 'relative' }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {show ? (
                        <VisibilityOffIcon
                            sx={{
                                position: 'absolute',
                                marginBottom: '15px',
                                marginTop: '-75px',
                                marginLeft: '500px',
                            }}
                            onClick={() => setShow(!show)}
                        />
                    ) : (
                        <VisibilityIcon
                            onClick={() => setShow(!show)}
                            sx={{
                                position: 'absolute',
                                marginBottom: '15px',
                                marginTop: '-75px',
                                marginLeft: '500px',
                            }}
                        />
                    )}

                    <TextField
                        size="small"
                        type={showRepassword ? 'text' : 'password'}
                        placeholder="Nhập lại mật khẩu mới"
                        fullWidth
                        autoComplete="new-password"
                        sx={{
                            fontSize: '15px',
                            marginBottom: '15px',
                            position: 'relative',
                        }}
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                    {showRepassword ? (
                        <VisibilityOffIcon
                            sx={{
                                position: 'absolute',
                                marginTop: '25px',
                                marginLeft: '500px',
                            }}
                            onClick={() => setShowRepassword(!showRepassword)}
                        />
                    ) : (
                        <VisibilityIcon
                            onClick={() => setShowRepassword(!showRepassword)}
                            sx={{
                                position: 'absolute',
                                marginTop: '25px',
                                marginLeft: '500px',
                            }}
                        />
                    )}
                    <div style={{ position: 'relative', width: '100%' }}>
                        {errorMessage && (
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: 'red',
                                    top: '-15px',
                                    position: 'absolute',
                                    bottom: '5px',
                                    left: 0,
                                    right: 0,
                                    textAlign: 'center',
                                }}
                            >
                                {errorMessage}
                            </p>
                        )}
                    </div>
                    <Button variant="outlined" sx={{ marginTop: '25px' }} onClick={handleChangePassword}>
                        Tạo lại mật khẩu
                    </Button>
                </>
            )}
        </Container>
    );
};

export default ResetPassword;
