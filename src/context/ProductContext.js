import React, { createContext, useState, useEffect } from "react";
import ProductService from "../Services/productService";

// Tạo một context mới
const ProductContext = createContext();

// Tạo một Provider cho context
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Gọi ProductService.getProducts() khi component được tạo
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    // Cung cấp dữ liệu sản phẩm cho các component con thông qua Context.Provider
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook để sử dụng dữ liệu sản phẩm từ Context
export const useProducts = () => {
  const products = React.useContext(ProductContext);
  if (!products) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return products;
};
