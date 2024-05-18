import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Page/CSS/Product.css';
import Navbar from '../Components/Navbar/Navbar';
import ProductList from '../Components/ProductList/ProductList';
import FilterProducts from '../Components/FilterProducts/FilterProducts';
import CompareList from '../Components/CompareList/CompareList';
import Footer from '../Components/Footer/Footer';
import ScrollToTop from 'react-scroll-to-top';
import { RiArrowUpDoubleFill } from 'react-icons/ri';

const Product = () => {
    window.scrollTo(0, 0);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedBrand = searchParams.get('brand');

    const [selectedCategory, setSelectedCategory] = useState(selectedBrand);
    const [filters, setFilters] = useState({});

    const handleBrandClick = (brand) => {
        setSelectedCategory(brand);
    };
    const handleFilters = (filterParams) => {
        setFilters(filterParams);
    };
    return (
        <div className="product">
            <ScrollToTop smooth component={<RiArrowUpDoubleFill size={25} color="#253b80" />} />
            <Navbar handleBrandClick={handleBrandClick} />
            <FilterProducts handleFilters={handleFilters} />
            <ProductList selectedCategory={selectedCategory} filters={filters} />
            <CompareList />
            <Footer />
        </div>
    );
};

export default Product;
