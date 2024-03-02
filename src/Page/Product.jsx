import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import ProductList from "../Components/ProductList/ProductList";
import FilterProducts from "../Components/FilterProducts/FilterProducts";
import Item from "../Components/Item/Item";

const Product = () => {
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const product = {
    name: "Samsung Galaxy S24 5G ",
    image:
      "https://cdn.tgdd.vn/Products/Images/42/299033/iphone-15-pro-blue-thumbnew-600x600.jpg",
    oldPrice: 10000000,
    newPrice: 8000000,
    discountPercent: 20,
    rating: 4.5,
    reviews: 100,
  };

  return (
    <div>
      <Navbar handleBrandClick={handleBrandClick} />
      <FilterProducts />
      <ProductList brand={selectedBrand} />
      <Item product={product} />
    </div>
  );
};

export default Product;
