import React, { useState } from "react";
import "./Item.css"; // Import CSS file

const Item = ({ product }) => {
  const { image, name, oldPrice, newPrice, discountPercent, rating, reviews } =
    product;

  const [isCompared, setIsCompared] = useState(false); // State cho trạng thái so sánh

  const addToCart = () => {
    // Code xử lý thêm sản phẩm vào giỏ hàng
  };

  const toggleCompare = () => {
    setIsCompared(!isCompared); // Đảo ngược trạng thái so sánh
  };

  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        <img className="product-card-image" src={image} alt={name} />
      </div>
      <div className="product-card-info">
        <div className="product-card-name">{name}</div>
        <div className="product-card-prices">
          <span className="product-card-new-price">
            {newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </span>
          {discountPercent > 0 && (
            <span className="product-card-old-price">
              {oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
            </span>
          )}
          {discountPercent > 0 && (
            <span className="product-card-discount">-{discountPercent}%</span>
          )}
        </div>
        <div className="product-card-rating">
          <span className="product-card-rating-stars">★ {rating}</span>
          <span className="product-card-rating-count">({reviews})</span>
        </div>
        <div>
          <span className="product-card-compare" onClick={toggleCompare}>
            {isCompared ? "✓ Đã thêm vào so sánh" : "+ So sánh"}
          </span>
        </div>
        <div className="product-card-actions">
          <button className="product-card-action-button" onClick={addToCart}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
