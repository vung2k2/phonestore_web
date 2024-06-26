import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import Loading from '../Components/Loading/Loading';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, { email });
            setIsLoading(false);
            if (response.data.status === false) {
                setResponse(false);
                setErrorMessage(response.data.message);
            }
            setResponse(true);
        } catch (error) {
            setIsLoading(false);
            setErrorMessage('Email chưa được đăng ký, vui lòng kiểm tra lại');
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                marginTop: '150px',
                border: '1px solid lightgray',
                borderRadius: '10px',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Loading isLoading={isLoading} />
            {response === true ? (
                <>
                    <Typography sx={{ textAlign: 'center' }}>Vui lòng kiểm tra email</Typography>
                    <CheckIcon
                        sx={{
                            marginTop: '15px',
                            marginBottom: '15px',
                            color: 'blue',
                            fontSize: '50px',
                        }}
                    />
                </>
            ) : (
                <>
                    <Typography sx={{ textAlign: 'center' }}>Vui lòng nhập email bạn đã đăng ký</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        type="email"
                        sx={{ marginTop: '15px', marginBottom: '15px' }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errorMessage ? (
                        <p style={{ fontSize: '14px', color: 'red', marginBottom: '10px' }}>{errorMessage}</p>
                    ) : (
                        <></>
                    )}
                    <Button onClick={handleSearch} variant="outlined">
                        Lấy mã
                    </Button>
                </>
            )}
        </Container>
    );
};

export default ForgotPassword;
