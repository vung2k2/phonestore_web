import React from "react";

const ProductList = ({ brand }) => {
  // Xử lý hiển thị danh sách sản phẩm của hãng được chọn
  return (
    <div>
      <h2>{brand} Products</h2>
    </div>
  );
};

export default ProductList;
