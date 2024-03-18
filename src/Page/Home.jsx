import React from 'react';
import axios from 'axios';
import Footer from '../Components/Footer/Footer';

const Home = () => {
    const getData = async () => {
        await axios
            .get('http://localhost:1406/public/products')
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
    };

    getData();

    return (
        <div>
            Home
            <Footer />
        </div>
    );
};

export default Home;
