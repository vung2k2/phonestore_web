import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SelectAddress.css';

const SelectAddress = ({ onSelect }) => {
    const token = '51b865c2-ed79-11ee-aebc-56bc015a6b03';
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');
    const [addressDetail, setAddressDetail] = useState('');

    // Lấy danh sách tỉnh/thành phố từ API khi component được render
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get(
                    'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Token: token, // Thêm token vào header
                        },
                    },
                );
                setProvinces(response.data.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, []);

    // Lấy danh sách quận/huyện từ API khi selectedProvince thay đổi
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await axios.post(
                    'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
                    {
                        province_id: parseInt(selectedProvince),
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Token: token, // Thêm token vào header
                        },
                    },
                );
                setDistricts(response.data.data);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };

        if (selectedProvince) {
            fetchDistricts();
        }
    }, [selectedProvince]);

    // Lấy danh sách phường/xã từ API khi selectedDistrict thay đổi
    useEffect(() => {
        const fetchWards = async () => {
            try {
                const response = await axios.post(
                    'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward',
                    {
                        district_id: parseInt(selectedDistrict),
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Token: token, // Thêm token vào header
                        },
                    },
                );
                setWards(response.data.data);
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
        };

        if (selectedDistrict) {
            fetchWards();
        }
    }, [selectedDistrict]);

    // Hàm gửi dữ liệu đã chọn lên component cha khi người dùng hoàn thành việc chọn địa chỉ

    const handleAddressSelect = () => {
        // Lấy tên của tỉnh/thành phố được chọn
        const selectedProvinceName =
            provinces.find((province) => province.ProvinceID === parseInt(selectedProvince))?.ProvinceName || '';
        // Lấy tên của quận/huyện được chọn
        const selectedDistrictName =
            districts.find((district) => district.DistrictID === parseInt(selectedDistrict))?.DistrictName || '';
        // Lấy tên của phường/xã được chọn
        const selectedWardName = wards.find((ward) => ward.WardCode === selectedWard)?.WardName || '';

        // Tạo địa chỉ từ các giá trị đã chọn
        const address = `${addressDetail} - ${selectedWardName} - ${selectedDistrictName} - ${selectedProvinceName}`;
        // Gọi hàm callback và truyền địa chỉ đã chọn tới cart.jsx
        onSelect(address);
    };

    return (
        <div className="select-address">
            <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                <option value="">Tỉnh/Thành phố</option>
                {provinces.map((province) => (
                    <option key={province.ProvinceID} value={province.ProvinceID}>
                        {province.ProvinceName}
                    </option>
                ))}
            </select>
            <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                <option value="">Quận/Huyện</option>
                {districts.map((district) => (
                    <option key={district.DistrictID} value={district.DistrictID}>
                        {district.DistrictName}
                    </option>
                ))}
            </select>
            <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
                <option value="">Phường/Xã</option>
                {wards.map((ward) => (
                    <option key={ward.WardCode} value={ward.WardCode}>
                        {ward.WardName}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Địa chỉ cụ thể"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
            />
            <button onClick={handleAddressSelect}>Xác nhận</button>
        </div>
    );
};

export default SelectAddress;
