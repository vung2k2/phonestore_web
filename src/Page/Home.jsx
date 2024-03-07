import React from "react";
import axios from "axios";

const Home = () => {
  const getData = async () => {
    await axios.get('http://localhost:1406/public/products')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  getData()

  return <div>Home</div>;
};

export default Home;
