import React, { createContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [compareList, setCompareList] = useState([]);
    const [viewedProducts, setViewedProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    const allProducts = useProducts();

    // Danh sách sp đã xem
    useEffect(() => {
        const storedViewedProducts = JSON.parse(localStorage.getItem('viewedHistory')) || [];
        setViewedProducts(storedViewedProducts);
    }, []);

    const getViewedProducts = () => {
        return viewedProducts.map((productId) => allProducts.find((product) => product.id === productId));
    };

    // Danh sách so sánh
    useEffect(() => {
        const storedCompareList = JSON.parse(localStorage.getItem('compareList')) || [];
        setCompareList(storedCompareList);
    }, []);

    const addToCompareList = (product) => {
        if (compareList.length < 3 && !compareList.find((item) => item.id === product.id)) {
            const newCompareList = [...compareList, product];
            setCompareList(newCompareList);
            localStorage.setItem('compareList', JSON.stringify(newCompareList));
        }
    };

    const removeFromCompareList = (productId) => {
        const updatedCompareList = compareList.filter((item) => item.id !== productId);
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
    }, [accessToken]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:1406/user/cart', {
                headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
            });
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const refreshAccessToken = async (refreshToken) => {
        try {
            const response = await axios.post(
                'http://localhost:1406/auth/refresh-token',
                null, // Body của yêu cầu POST, ở đây không cần body nên để null
                {
                    headers: { refreshToken: refreshToken },
                },
            );

            const newAccessToken = response.data;
            localStorage.setItem('accessToken', newAccessToken);
            // Thực hiện lại request gốc với accessToken mới
        } catch (error) {
            console.error('Error refreshing access token:', error);
        }
    };

    const getTotalCartItems = () => {
        return cartItems.length;
    };

    const addToCart = async (id, quantity) => {
        // // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        // const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

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

        try {
            const response = await axios.post(
                'http://localhost:1406/user/cart',
                {
                    productId: id,
                    quantity: quantity,
                },
                {
                    headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
                },
            );
            toast.success('Đã thêm vào giỏ hàng', { position: 'top-center', autoClose: 1500 });
            fetchCartItems();
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            // Xử lý lỗi nếu có
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:1406/user/delete-product/${productId}`, {
                headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
            });
            setCartItems(cartItems.filter((item) => item.id !== productId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const deleteCart = async () => {
        try {
            await axios.post(
                `http://localhost:1406/user/delete-all-cart`,
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
                `http://localhost:1406/user/change-quantity`,
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

    const createOrder = async (amount) => {
        try {
            console.log(amount);
            const order = await axios.post(
                'http://localhost:1406/user/order',
                {
                    total_amount: amount,
                    provider: 'vnpay',
                    payment_status: 'pending',
                },
                {
                    headers: { 'Content-Type': 'application/json', AccessToken: localStorage.getItem('accessToken') },
                },
            );

            let order_id = order.data.insertId;
            console.log(cartItems.length);
            for (let i = 0; i < cartItems.length; i++) {
                await axios.post(
                    'http://localhost:1406/user/order-detail',
                    {
                        order_id: order_id,
                        productId: cartItems[i].id,
                        quantity: cartItems[i].productQuantity,
                        price: parseInt(parseInt(cartItems[i].productQuantity) * parseInt(cartItems[i].newPrice)),
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            AccessToken: localStorage.getItem('accessToken'),
                        },
                    },
                );
            }
            deleteCart();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const CancelOrder = async (id) => {
        try {
            await axios.put(
                `http://localhost:1406/user/order/${id}`,
                {},

                {
                    headers: {
                        'Content-Type': 'application/json',
                        AccessToken: localStorage.getItem('accessToken'),
                    },
                },
            );
            fetchOrders();
            toast.success(`Đã hủy đơn hàng #${id}`, { position: 'top-center', autoClose: 1500 });
        } catch (error) {
            console.error('Lỗi huỷ đơn hàng:', error);
            toast.error('Đã xảy ra lỗi!', { position: 'top-center', autoClose: 1500 });
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                'http://localhost:1406/user/detail-order',

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

    const updateInfo = async (name, address, phone) => {
        try {
            await axios.put(
                `http://localhost:1406/user/info`,
                {
                    name: name,
                    address: address,
                    phone: phone,
                },
                {
                    headers: { 'Content-Type': 'application/json', AccessToken: accessToken },
                },
            );
            localStorage.setItem('userName', name);
            localStorage.setItem('userAddress', address);
            localStorage.setItem('userPhoneNumber', phone);
            toast.success('Đã cập nhật thông tin cá nhân!', { position: 'top-center', autoClose: 1500 });
            window.location.reload();
        } catch (error) {
            console.error('Lỗi cập nhật thoong tin cá nhân:', error);
            toast.error('Đã xảy ra lỗi!', { position: 'top-center', autoClose: 1500 });
        }
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
    };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
export default ShopContextProvider;
