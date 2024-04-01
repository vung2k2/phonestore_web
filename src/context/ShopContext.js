import React, { createContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext';
import axios from 'axios';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [compareList, setCompareList] = useState([]);
    const [viewedProducts, setViewedProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
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

            const fetchCartItems = async () => {
                try {
                    const response = await axios.get('http://localhost:1406/user/cart', {
                        headers: { 'Content-Type': 'application/json', AccessToken: storedAccessToken },
                    });
                    setCartItems(response.data);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                    await refreshAccessToken(storedRefreshToken);
                }
            };

            fetchCartItems();
            setTimeout(async () => {
                console.log(cartItems);
            }, 5000);
        }
    }, [accessToken]);

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

    const addToCart = async (productId) => {
        try {
            const response = await axios.post(
                'http://localhost:1406/user/cart',
                { productId },
                {
                    headers: { 'Content-Type': 'application/json', AccessToken: accessToken },
                },
            );
            setCartItems([...cartItems, response.data]);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:1406/user/cart/${productId}`, {
                headers: { 'Content-Type': 'application/json', AccessToken: accessToken },
            });
            setCartItems(cartItems.filter((item) => item.id !== productId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
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
        addToCart,
        removeFromCart,
    };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
