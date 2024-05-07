import React from 'react';
import './CSS/Home.css';
import BannerSlider from '../Components/BannerSlider/BannerSlider';
import HomeProductList from '../Components/HomeProductList/HomeProductList';
import { useProducts } from '../context/ProductContext';
import Footer from '../Components/Footer/Footer';
import ScrollToTop from 'react-scroll-to-top';
import { RiArrowUpDoubleFill } from 'react-icons/ri';

const Home = () => {
    const allproducts = useProducts();
    window.scrollTo(0, 0);
    return (
        <div className="home">
            <ScrollToTop smooth component={<RiArrowUpDoubleFill size={25} color="#253b80" />} />
            <BannerSlider />
            <HomeProductList listProduct={allproducts} />
            <Footer />
        </div>
    );
};

export default Home;
