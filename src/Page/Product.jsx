import React, { useState } from 'react';
import '../Page/CSS/Product.css';
import Navbar from '../Components/Navbar/Navbar';
import ProductList from '../Components/ProductList/ProductList';
import FilterProducts from '../Components/FilterProducts/FilterProducts';
import CompareList from '../Components/CompareList/CompareList';
import Footer from '../Components/Footer/Footer';

const Product = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filters, setFilters] = useState({});

    const handleBrandClick = (brand) => {
        setSelectedCategory(brand);
    };
    const handleFilters = (filterParams) => {
        setFilters(filterParams);
    };
    return (
        <div className="product">
            <Navbar handleBrandClick={handleBrandClick} />
            <FilterProducts handleFilters={handleFilters} />
            <ProductList selectedCategory={selectedCategory} filters={filters} />
            <CompareList />
            <Footer />
        </div>
    );
};

export default Product;
