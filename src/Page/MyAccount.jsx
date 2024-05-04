import React, { useContext, useState } from 'react';
import './CSS/MyAccount.css';
import { FaRegUserCircle } from 'react-icons/fa';
import Footer from '../Components/Footer/Footer';
import { TextField } from '@mui/material';
import SelectAddress from '../Components/SelectAddress/SelectAddress';
import { ShopContext } from '../context/ShopContext';
import { ClassNames } from '@emotion/react';
import { Link } from 'react-router-dom';

const MyAccount = () => {
    const { updateInfo } = useContext(ShopContext);
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [userPhoneNumber, setUserPhoneNumber] = useState(
        localStorage.getItem('userPhoneNumber') === 'null' || localStorage.getItem('userPhoneNumber') === 'undefined'
            ? ''
            : localStorage.getItem('userPhoneNumber'),
    );
    const [userAddress, setUserAddress] = useState(
        localStorage.getItem('userAddress') === 'null' || localStorage.getItem('userAddress') === 'undefined'
            ? ''
            : localStorage.getItem('userAddress'),
    );

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleEditAddress = () => {
        setIsEditingAddress((prevState) => !prevState);
    };
    const handleAddressSelect = (address) => {
        setUserAddress(address);
        localStorage.setItem('userAddress', address);
        setIsEditingAddress(false);
    };
    return (
        <div>
            <div className="my-account">
                <div className="my-account-main">
                    <div className="title">
                        <h2>Thông tin cá nhân</h2>
                    </div>
                    <div className="img">
                        <FaRegUserCircle size={80} color="#253b80" />
                    </div>
                    {isEditing ? (
                        <div className="edit-form">
                            <div>
                                <TextField
                                    id="user-name"
                                    label="Họ tên"
                                    variant="outlined"
                                    defaultValue={userName}
                                    error={userName === ''}
                                    helperText={userName === '' && 'Vui lòng nhập họ tên'}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        setUserName(value);
                                    }}
                                    style={{ marginBottom: '20px' }}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="user-phone-number"
                                    label="Số điện thoại"
                                    variant="outlined"
                                    defaultValue={userPhoneNumber}
                                    error={userPhoneNumber === ''}
                                    helperText={userPhoneNumber === '' && 'Vui lòng nhập số điện thoại'}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        setUserPhoneNumber(value);
                                    }}
                                />
                            </div>

                            <div className="address">
                                <p>
                                    <i>
                                        <b>Địa chỉ: </b>
                                    </i>
                                    {'     '}
                                    {userAddress}
                                    <span
                                        onClick={handleEditAddress}
                                        style={{
                                            color: 'blue',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            marginLeft: '6px',
                                        }}
                                    >
                                        Sửa
                                    </span>
                                </p>
                                {isEditingAddress && <SelectAddress onSelect={handleAddressSelect} />}
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        updateInfo(userName, userAddress, userPhoneNumber);
                                    }}
                                    className="btn"
                                >
                                    Cập nhật thông tin
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="info">
                            <div className="info-main">
                                <div className="name">
                                    <p>Họ và tên</p>
                                    <p>{localStorage.getItem('userName')}</p>
                                </div>
                                <div className="phone-number">
                                    <p>Số điện thoại</p>
                                    <p>{userPhoneNumber}</p>
                                </div>
                                <div className="address">
                                    <p>Địa chỉ</p>
                                    <p>{userAddress}</p>
                                </div>

                                <button onClick={handleEditClick}>Chỉnh sửa thông tin</button>
                                <Link to="/my-account/password">
                                    <button style={{ background: '#cad8ff', color: '#3d559d', fontWeight: 600 }}>
                                        Thay đổi mật khẩu
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyAccount;
