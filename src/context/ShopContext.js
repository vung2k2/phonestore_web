import React, { createContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const [compareList, setCompareList] = useState([]);
    const [viewedProducts, setViewedProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const navigate = useNavigate();
    let allProducts = useProducts();

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._isRetry) {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const newAccessToken = await refreshAccessToken(refreshToken);
                    localStorage.setItem('accessToken', newAccessToken);
                    originalRequest.headers.Accesstoken = newAccessToken;
                    originalRequest._isRetry = true;
                    return axios(originalRequest);
                }
            }
            return Promise.reject(error);
        },
    );

    // Danh sách sp đã xem
    useEffect(() => {
        const storedViewedProducts = JSON.parse(localStorage.getItem('viewedHistory')) || [];
        setViewedProducts(storedViewedProducts);
    }, []);

    const getViewedProducts = () => {
        return viewedProducts.map((productId) => allProducts.find((product) => product._id === productId));
    };

    // Danh sách so sánh
    useEffect(() => {
        const storedCompareList = JSON.parse(localStorage.getItem('compareList')) || [];
        setCompareList(storedCompareList);
    }, []);

    const addToCompareList = (product) => {
        if (compareList.length < 3 && !compareList.find((item) => item._id === product._id)) {
            const newCompareList = [...compareList, product];
            setCompareList(newCompareList);
            localStorage.setItem('compareList', JSON.stringify(newCompareList));
            toast.success('Đã thêm vào danh sách so sánh!');
        } else {
            toast.warning('Sản phẩm đã có trong danh sách!');
        }
    };

    const removeFromCompareList = (productId) => {
        const updatedCompareList = compareList.filter((item) => item._id !== productId);
        setCompareList(updatedCompareList);
        localStorage.setItem('compareList', JSON.stringify(updatedCompareList));
    };

    const removeAllFromCompareList = () => {
        setCompareList([]);
        localStorage.removeItem('compareList');
    };

    // Cart
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedAccessToken && storedRefreshToken) {
            // Kiểm tra nếu có accessToken trong localStorage
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);

            fetchCartItems();
        }
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/cart`, {
                headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
            });
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const refreshAccessToken = async (refreshToken) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/refresh-token`, null, {
                headers: { refreshToken: refreshToken },
            });
            if (!response.data.accessToken || !response.data.refreshToken) {
                throw new Error('Refresh token response is empty');
            }
            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;
            localStorage.setItem('refreshToken', newRefreshToken);
            return newAccessToken;
        } catch (error) {
            localStorage.removeItem('userAddress');
            localStorage.removeItem('userPhoneNumber');
            localStorage.removeItem('userName');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
    };

    const getTotalCartItems = () => {
        return cartItems.length;
    };

    const addToCart = async (id, quantity) => {
        // // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        // const existingProductIndex = cartItems.findIndex((item) => item._id === product._id);

        // if (existingProductIndex !== -1) {
        //     // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng của nó
        //     const updatedCartItems = cartItems.map((item, index) => {
        //         if (index === existingProductIndex) {
        //             return { ...item, productQuantity: item.productQuantity + quantity };
        //         }
        //         return item;
        //     });

        //     setCartItems(updatedCartItems);
        // } else {
        //     // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng với số lượng là 1
        //     const updatedProduct = { ...product, productQuantity: quantity };
        //     setCartItems([...cartItems, updatedProduct]);
        // }

        if (localStorage.getItem('refreshToken') === null) {
            toast.error('Bạn cần đăng nhập trước!');
            return;
        }
        try {
            const response = await axios.post(
                `${baseUrl}/user/cart`,
                {
                    productId: id,
                    quantity: quantity,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        AccessToken: localStorage.getItem('accessToken'),
                    },
                },
            );
            toast.success('Đã thêm vào giỏ hàng');
            fetchCartItems();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`${baseUrl}/user/delete-product/${productId}`, {
                headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
            });
            setCartItems(cartItems.filter((item) => item._id !== productId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const deleteCart = async () => {
        try {
            await axios.post(
                `${baseUrl}/user/delete-all-cart`,
                {},
                {
                    headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
                },
            );
            setCartItems([]);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const changeQuantityItem = async (productId, quantity) => {
        try {
            await axios.put(
                `${baseUrl}/user/change-quantity`,
                {
                    productId: productId,
                    quantity: quantity,
                },
                {
                    headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
                },
            );
        } catch (error) {
            console.error('Lỗi cập nhật số lượng sp trong cart:', error);
        }
    };

    const totalAmount = () => {
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].newPrice * cartItems[i].productQuantity;
        }

        return total;
    };

    const createOrder = async (provider, orderInfo) => {
        try {
            const order = await axios.post(
                `${baseUrl}/user/order`,
                {
                    provider: provider,
                    orderInfo: orderInfo,
                },
                {
                    headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
                },
            );
            window.location.href = `/order-return?${provider}_TransactionStatus=00`;
        } catch (error) {
            console.error('Error creating order:', error);

            navigate(`/order-return?${provider}_TransactionStatus=01`);
        }
    };

    const CancelOrder = async (id) => {
        try {
            await axios.put(
                `${baseUrl}/user/order/${id}`,
                {},

                {
                    headers: {
                        'Content-Type': 'application/json',
                        AccessToken: localStorage.getItem('accessToken'),
                    },
                },
            );
            fetchOrders();
            toast.success(`Đã hủy đơn hàng #${id.slice(-6)}`);
        } catch (error) {
            console.error('Lỗi huỷ đơn hàng:', error);
            toast.error('Đã xảy ra lỗi!');
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/user/order`,

                {
                    headers: {
                        'Content-Type': 'application/json',
                        AccessToken: localStorage.getItem('accessToken'),
                    },
                },
            );
            setOrders(response.data);
        } catch (error) {
            console.error('Lỗi tải đơn hàng:', error);
        }
    };

    const ratingProduct = async (orderId, productId, rate, comment) => {
        try {
            await axios.post(
                `${baseUrl}/user/review`,
                {
                    orderId: orderId,
                    productId: productId,
                    rate: rate,
                    comment: comment,
                },
                {
                    headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
                },
            );
            toast.success('Cám ơn bạn đã đánh giá!');
            fetchOrders();
            updateProductReview(productId, rate);
        } catch (error) {
            console.error('Lỗi đánh giá sp:', error);
            toast.error('Đã xảy ra lỗi!');
        }
    };
    const updateProductReview = (productId, rating) => {
        const productIndex = allProducts.findIndex((product) => product._id === productId);

        if (productIndex !== -1) {
            const productToUpdate = allProducts[productIndex];
            productToUpdate.rate += rating;
            productToUpdate.numberReview += 1;
            allProducts[productIndex] = productToUpdate;
        } else {
        }
    };
    const updateInfo = async (name, address, phone) => {
        try {
            await axios.put(
                `${baseUrl}/user/info`,
                {
                    name: name,
                    address: address,
                    phone: phone,
                },
                {
                    headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
                },
            );
            localStorage.setItem('userName', name);
            localStorage.setItem('userAddress', address);
            localStorage.setItem('userPhoneNumber', phone);
            window.location.reload();
            toast.success('Đã cập nhật thông tin cá nhân!');
        } catch (error) {
            console.error('Lỗi cập nhật thoong tin cá nhân:', error);
            toast.error('Đã xảy ra lỗi!');
        }
    };

    const getReviewsProduct = async (productId) => {
        try {
            const reviews = await axios.get(`${baseUrl}/public/review/${productId}`, {
                headers: { 'Content-Type': 'application/json' },
            });
            return reviews.data;
        } catch (error) {
            console.error('Lỗi lấy đánh giá sp:', error);
        }
    };

    // Hàm chuyển đổi ngày giờ
    const formatDateTime = (mysqlDateString) => {
        const originalDate = new Date(mysqlDateString);
        const year = originalDate.getFullYear();
        const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
        const day = ('0' + originalDate.getDate()).slice(-2);
        const hours = ('0' + originalDate.getHours()).slice(-2);
        const minutes = ('0' + originalDate.getMinutes()).slice(-2);

        return `${hours}:${minutes} ${day}/${month}/${year} `;
    };

    const contextValue = {
        compareList,
        addToCompareList,
        removeFromCompareList,
        removeAllFromCompareList,
        getViewedProducts,
        setViewedProducts,
        cartItems,
        orders,
        setCartItems,
        getTotalCartItems,
        addToCart,
        removeFromCart,
        deleteCart,
        createOrder,
        CancelOrder,
        fetchOrders,
        changeQuantityItem,
        updateInfo,
        ratingProduct,
        getReviewsProduct,
        formatDateTime,
    };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
export default ShopContextProvider;
