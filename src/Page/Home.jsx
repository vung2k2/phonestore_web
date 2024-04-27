import React from 'react';
import './CSS/Home.css';
import BannerSlider from '../Components/BannerSlider/BannerSlider';
import HomeProductList from '../Components/HomeProductList/HomeProductList';
import { useProducts } from '../context/ProductContext';
import Footer from '../Components/Footer/Footer';

const Home = () => {
    const allproducts = useProducts();

    return (
        <div className="home">
            <BannerSlider />
            <HomeProductList listProduct={allproducts} />
            <Footer />
        </div>
    );
};

export default Home;
