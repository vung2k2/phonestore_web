import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState } from 'react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';
import { Flag } from '@mui/icons-material';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [mailError, setMailError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = async (event) => {
        setIsLoading(true);
        try {
            event.preventDefault();
            if (name === '') {
                setNameError(true);
            } else setNameError(false);
            if (email === '') {
                setMailError(true);
            } else setMailError(false);

            if (password === '') {
                setPassError(true);
            } else setPassError(false);

            await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                name,
                email,
                password,
            });
            setIsLoading(false);
            setSuccess(true);
            toast.success('Đăng ký tài khoản thành công', { position: 'top-center', autoClose: 1500 });
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setIsLoading(false);
            console.error('Lỗi đăng ký:', error.response ? error.response.data : error.message);
            if (error.response) {
                toast.error(`${error.response.data.message}`, { position: 'top-center', autoClose: 1500 });
            } else {
                toast.error('Lỗi đăng ký', { position: 'top-center', autoClose: 1500 });
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Loading isLoading={isLoading} />
            <CssBaseline />
            {success === true ? (
                <Box
                    sx={{
                        width: '100%',
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ fontSize: '30px' }}>
                        Đăng ký
                    </Typography>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => navigate('/login')}>
                        Đăng nhập ngay
                    </Button>
                </Box>
            ) : (
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ fontSize: '30px' }}>
                        Đăng ký
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} style={{ position: 'relative' }}>
                        <TextField
                            error={nameError}
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                            value={name}
                            required={true}
                            fullWidth
                            id="name"
                            label="Tên"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            error={mailError}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            value={email}
                            required={true}
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            error={passError}
                            margin="normal"
                            required={true}
                            value={password}
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="new-password"
                        />
                        {showPassword ? (
                            <RiEyeLine
                                onClick={togglePasswordVisibility}
                                style={{ position: 'absolute', top: 192, right: 10, cursor: 'pointer' }}
                                size={27}
                                color="#808080"
                            />
                        ) : (
                            <RiEyeCloseLine
                                onClick={togglePasswordVisibility}
                                style={{ position: 'absolute', top: 192, right: 10, cursor: 'pointer' }}
                                size={27}
                                color="#808080"
                            />
                        )}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" defaultChecked />}
                            label="Nhớ mật khẩu"
                        />

                        {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default Signup;
