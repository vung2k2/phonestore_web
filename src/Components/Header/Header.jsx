import React, { useState } from "react";
import "./Header.css";
import logo from "../../Assets/img/logo.png";
import cart_icon from "../../Assets/img/cart_icon.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const toggleLoginOptions = () => {
    setShowLoginOptions(!showLoginOptions);
  };
  return (
    <div className="header">
      <div className="header-logo">
        <Link
          className="header-logo"
          style={{ textDecoration: "none", color: "white" }}
          to="/"
        >
          <img src={logo} alt="" />
          <p>Phonestore</p>
        </Link>
      </div>
      <div className="search-box">
        <input type="search" name="search-w" placeholder="Bạn cần tìm gi?" />
        <button type="submit">Tìm kiếm</button>
      </div>
      <ul className="header-menu">
        <li>
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            Trang chủ
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/product"
          >
            Sản Phẩm
          </Link>
        </li>
        <li className="account">
          <span
            style={{
              textDecoration: "none",
              color: "white",
            }}
            onClick={toggleLoginOptions}
          >
            Tài Khoản <span>&#9660;</span>
          </span>
          {showLoginOptions && (
            <ul className="login-options" onClick={toggleLoginOptions}>
              <li>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  to="/login"
                >
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  to="/signup"
                >
                  Đăng ký
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="cart">
          <Link style={{ textDecoration: "none", color: "white" }} to="/cart">
            <img src={cart_icon} alt="" />
          </Link>
          <div className="cart-count">0</div>
        </li>
      </ul>
    </div>
  );
};

export default Header;
