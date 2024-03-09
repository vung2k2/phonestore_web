import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "./CSS/ProductDetail.css";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import Breadcrum from "../Components/Breadcrum/Breadcrum";

const ProductDetail = () => {
  const { slug } = useParams();
  const allProducts = useProducts();
  const [isCompared, setIsCompared] = useState(false);
  const product = allProducts.find((product) => product.slug === slug);

  const toggleCompare = () => {
    setIsCompared(!isCompared);
  };

  // Viết hoa tên hãng
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (!product) {
    return <div></div>;
  }

  const videoId = product.videoUrl.split("/").pop();

  const slideImages = [
    `https://www.youtube.com/embed/${videoId}`,
    `${product.imageUrl}`,
  ];

  const properties = {
    autoplay: false,
    infinite: true,
    indicators: true,
    arrows: true,
  };

  return (
    <div>
      <Breadcrum product={product} />
      <div className="product-detail">
        <div className="product-detail-header">
          <h2>Điện thoại {product.name}</h2>
          <div className="rating">
            <span className="number-stars">{product.numberReview}</span>
            <span className="stars">★★★★★</span>
            <span className="rating-count">({product.rate})</span>
          </div>
          <span className="product-card-compare" onClick={toggleCompare}>
            {isCompared ? "✓ Đã thêm vào so sánh" : "+ So sánh"}
          </span>
        </div>

        <div className="box-main">
          <div className="box-left">
            <div className="slide-show">
              <Slide {...properties}>
                {slideImages.map((slide, index) => (
                  <div key={index} className="each-slide">
                    {slide.includes("youtube.com") ? (
                      <iframe
                        title={`Slide ${index + 1}`}
                        width="560"
                        height="315"
                        src={`${slide}?rel=0`}
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        style={{
                          pointerEvents: "none",
                        }}
                        src={slide}
                        alt={`Slide ${index + 1}`}
                      />
                    )}
                  </div>
                ))}
              </Slide>
            </div>
            <div className="purchase">
              <span
                style={{
                  fontSize: "20px",
                  fontStyle: "italic",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
              >
                Giá ưu đãi:
              </span>
              <div className="product-price">
                <span className="product-new-price">
                  {product.newPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  đ
                </span>
                <span className="product-old-price">
                  {product.oldPrice.toString().length >= 8
                    ? product.oldPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : product.oldPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "d"}
                </span>
                <span className="product-discount">
                  Giảm{" "}
                  {Math.floor((1 - product.newPrice / product.oldPrice) * 100)}%
                </span>
              </div>

              <button className="btn-buy">
                <p
                  style={{
                    marginTop: "15px",
                    fontSize: "22px",
                    fontWeight: "700",
                    lineHeight: "0",
                  }}
                >
                  Mua ngay
                </p>
                <p style={{ fontStyle: "italic" }}>
                  (Miễn phí giao hàng trên toàn quốc)
                </p>
              </button>
            </div>
          </div>
          <div className="box-right">
            <div className="product-parameters">
              <span>Cấu hình Điện thoại {product.name}</span>
              <ul>
                <li>
                  <p className="parameter-name">Màn hình:</p>
                  <p className="parameter-value">{product.screen}</p>
                </li>
                <li>
                  <p className="parameter-name">Camera sau:</p>
                  <p className="parameter-value">{product.behindCam}</p>
                </li>
                <li>
                  <p className="parameter-name">Camera trước:</p>
                  <p className="parameter-value">{product.selfieCam}</p>
                </li>
                <li>
                  <p className="parameter-name">CPU:</p>
                  <p className="parameter-value">{product.chip}</p>
                </li>
                <li>
                  <p className="parameter-name">RAM:</p>
                  <p className="parameter-value">{product.ram} GB</p>
                </li>
                <li>
                  <p className="parameter-name">Dung lượng lưu trữ:</p>
                  <p className="parameter-value">{product.rom} GB</p>
                </li>
                <li>
                  <p className="parameter-name">Pin</p>
                  <p className="parameter-value">{product.pin} mAh</p>
                </li>
                <li>
                  <p className="parameter-name">Tốc độ sạc</p>
                  <p className="parameter-value">{product.chargeSpeed} W</p>
                </li>
                <li>
                  <p className="parameter-name">Hãng</p>
                  <p className="parameter-value">
                    {capitalizeFirstLetter(product.category)}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
