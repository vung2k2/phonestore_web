import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState } from 'react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import Loading from '../Components/Loading/Loading';

const Login = () => {
    window.scrollTo(0, 0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [mailError, setMailError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (event) => {
        setIsLoading(true);
        try {
            event.preventDefault();
            if (email === '') {
                setMailError(true);
            } else setMailError(false);

            if (password === '') {
                setPassError(true);
            } else setPassError(false);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                email,
                password,
            });

            setIsLoading(false);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userPhoneNumber', response.data.phone);
            localStorage.setItem('userAddress', response.data.address);

            window.location.href = '/';
        } catch (error) {
            setIsLoading(false);
            console.error('Lỗi đăng nhập:', error.response ? error.response.data : error.message);
            setErrorMessage('Vui lòng kiểm tra chính xác thông tin đăng nhập.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Loading isLoading={isLoading} />
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ fontSize: '30px' }}>
                    Đăng nhập
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }} style={{ position: 'relative' }}>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        value={email}
                        required={true}
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required={true}
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                    />
                    {showPassword ? (
                        <RiEyeLine
                            onClick={togglePasswordVisibility}
                            style={{ position: 'absolute', top: 110, right: 10, cursor: 'pointer' }}
                            size={27}
                            color="#808080"
                        />
                    ) : (
                        <RiEyeCloseLine
                            onClick={togglePasswordVisibility}
                            style={{ position: 'absolute', top: 110, right: 10, cursor: 'pointer' }}
                            size={27}
                            color="#808080"
                        />
                    )}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" defaultChecked />}
                        label="Nhớ mật khẩu"
                    />
                    {errorMessage && (
                        <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>
                            {errorMessage}
                        </p>
                    )}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot-password" variant="body2">
                                Quên mật khẩu?
                            </Link>
                        </Grid>
                        <Grid item>
                            <span style={{ fontSize: '15px' }}>Bạn chưa có tài khoản? </span>
                            <Link href="/signup " variant="body2">
                                Đăng ký
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
