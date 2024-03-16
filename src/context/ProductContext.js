import React, { createContext, useState, useEffect } from 'react';
import ProductService from '../Services/productService';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ProductService.getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchData();
    }, []);

    return <ProductContext.Provider value={products}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
    const products = React.useContext(ProductContext);
    if (!products) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return products;
};
