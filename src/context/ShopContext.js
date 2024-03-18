import React, { createContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [compareList, setCompareList] = useState([]);
    const [viewedProducts, setViewedProducts] = useState([]);

    const allProducts = useProducts();

    useEffect(() => {
        // Lấy danh sách sản phẩm đã xem từ Local Storage khi khởi động dự án
        const storedViewedProducts = JSON.parse(localStorage.getItem('viewedHistory')) || [];
        setViewedProducts(storedViewedProducts);
    }, []);

    const getViewedProducts = () => {
        // Lấy các sản phẩm đã xem từ allProducts theo thứ tự đã xem
        return viewedProducts.map((productId) => allProducts.find((product) => product.id === productId));
    };

    useEffect(() => {
        // Lấy danh sách sản phẩm so sánh từ Local Storage khi khởi động dự án
        const storedCompareList = JSON.parse(localStorage.getItem('compareList')) || [];
        setCompareList(storedCompareList);
    }, []);

    const addToCompareList = (product) => {
        // Kiểm tra nếu danh sách so sánh chưa đầy 3 sản phẩm và sản phẩm chưa tồn tại trong danh sách, thì thêm sản phẩm đó vào danh sách so sánh
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

    const contextValue = {
        compareList,
        addToCompareList,
        removeFromCompareList,
        removeAllFromCompareList,
        getViewedProducts,
        setViewedProducts,
    };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
