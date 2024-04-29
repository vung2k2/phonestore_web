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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [mailError, setMailError] = useState(false);
    const [passError, setPassError] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (event) => {
        try {
            event.preventDefault();
            if (email === '') {
                setMailError(true);
            } else setMailError(false);

            if (password === '') {
                setPassword(true);
            } else setPassword(false);
            const response = await axios.post('http://localhost:1406/auth/login', {
                email,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('userName', response.data.name);
                localStorage.setItem('userPhoneNumber', response.data.phone);
                localStorage.setItem('userAddress', response.data.address);

                window.location.href = '/';
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error.response ? error.response.data : error.message);
            setErrorMessage('Vui lòng kiểm tra chính xác thông tin đăng nhập.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
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
                    Sign In
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }} style={{ position: 'relative' }}>
                    <TextField
                        error={mailError}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        value={email}
                        required={true}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        error={passError}
                        margin="normal"
                        required={true}
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                    />
                    {showPassword ? (
                        <RiEyeCloseLine
                            onClick={togglePasswordVisibility}
                            style={{ position: 'absolute', top: 110, right: 10, cursor: 'pointer' }}
                            size={27}
                            color="#808080"
                        />
                    ) : (
                        <RiEyeLine
                            onClick={togglePasswordVisibility}
                            style={{ position: 'absolute', top: 110, right: 10, cursor: 'pointer' }}
                            size={27}
                            color="#808080"
                        />
                    )}
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup " variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
