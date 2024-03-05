// ProductDetail.js
import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const ProductDetail = () => {
  const { slug } = useParams();
  const allProducts = useProducts();

  // Tìm sản phẩm tương ứng với slug
  const product = allProducts.find((product) => product.slug === slug);

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>;
  }

  // Lấy mã ID từ URL của video
  const videoId = product.videoUrl.split("/").pop();

  // Hiển thị thông tin chi tiết sản phẩm
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <img src={product.imageUrl} alt={product.name} />
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`} // Nhúng video từ YouTube
      ></iframe>
      <p>Giá cũ: {product.oldPrice}</p>
      <p>Giá mới: {product.newPrice}</p>
      <p>Chip: {product.chip}</p>
      <p>Ram: {product.ram}</p>
      <p>Rom: {product.rom}</p>
      <p>Màn hình: {product.screen}</p>
      <p>Pin: {product.pin}</p>
      <p>Camera trước: {product.selfieCam}</p>
      <p>Camera sau: {product.behindCam}</p>
      <p>Tốc độ sạc: {product.chargeSpeed}</p>
      <p>Đánh giá: {product.rate}</p>
      <p>Số lượt đánh giá: {product.numberReview}</p>
    </div>
  );
};

export default ProductDetail;
