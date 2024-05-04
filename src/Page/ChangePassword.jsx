import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepassword, setShowRepassword] = useState(false);
    const [response, setResponse] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        if (password !== rePassword) {
            setErrorMessage('Mật khẩu mới không khớp');
        } else {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/user/change-password`,
                    {
                        oldPassword: oldPassword,
                        newPassword: password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            AccessToken: localStorage.getItem('accessToken'),
                        },
                    },
                );
                if (response.data.status === true) {
                    setResponse(true);
                    setOldPassword('');
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
                    <Typography sx={{ textAlign: 'center', fontSize: '18px' }}>Đổi mật khẩu</Typography>

                    <TextField
                        size="small"
                        type={showOldPassword ? 'text' : 'password'}
                        placeholder="Mật khẩu cũ"
                        fullWidth
                        autoComplete=""
                        sx={{ margin: '15px 0px', fontSize: '15px', position: 'relative' }}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    {showOldPassword ? (
                        <VisibilityIcon
                            sx={{
                                position: 'absolute',
                                marginBottom: '15px',
                                marginTop: '-125px',
                                marginLeft: '500px',
                            }}
                            onClick={() => setShowOldPassword(!showOldPassword)}
                        />
                    ) : (
                        <VisibilityOffIcon
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            sx={{
                                position: 'absolute',
                                marginBottom: '15px',
                                marginTop: '-125px',
                                marginLeft: '500px',
                            }}
                        />
                    )}

                    <TextField
                        size="small"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mật khẩu mới"
                        fullWidth
                        autoComplete="new-password"
                        sx={{
                            fontSize: '15px',
                            marginBottom: '15px',
                            position: 'relative',
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {showPassword ? (
                        <VisibilityIcon
                            sx={{
                                position: 'absolute',
                                marginTop: '-30px',
                                marginLeft: '500px',
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    ) : (
                        <VisibilityOffIcon
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{
                                position: 'absolute',
                                marginTop: '-30px',
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
                        <VisibilityIcon
                            sx={{
                                position: 'absolute',
                                marginTop: '75px',
                                marginLeft: '500px',
                            }}
                            onClick={() => setShowRepassword(!showRepassword)}
                        />
                    ) : (
                        <VisibilityOffIcon
                            onClick={() => setShowRepassword(!showRepassword)}
                            sx={{
                                position: 'absolute',
                                marginTop: '75px',
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
                        Đổi mật khẩu
                    </Button>
                </>
            )}
        </Container>
    );
};

export default ChangePassword;
