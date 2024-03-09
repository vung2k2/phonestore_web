import React, { useState } from "react";
import "./Navbar.css";
import samsung_logo from "../../Assets/img/samsung-logo.png";
import iphone_logo from "../../Assets/img/iphone-logo.png";
import masstel_logo from "../../Assets/img/masstel-logo.png";
import oppo_logo from "../../Assets/img/oppo-logo.jpg";
import vivo_logo from "../../Assets/img/vivo-logo.png";
import xiaomi_logo from "../../Assets/img/xiaomi-logo.png";
import other_logo from "../../Assets/img/other-logo.png";
import all_logo from "../../Assets/img/All.png";

const Navbar = ({ handleBrandClick }) => {
  const [activeBrand, setActiveBrand] = useState("");

  const handleBrand = (brand) => {
    setActiveBrand(brand);
    handleBrandClick(brand);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <img
            src={all_logo}
            onClick={() => handleBrand("")}
            alt=""
            className={`brand-logo ${activeBrand === "" ? "active" : ""}`}
          />
        </li>
        <li className="navbar-item">
          <img
            src={iphone_logo}
            onClick={() => handleBrand("iphone")}
            alt=""
            className={`brand-logo ${activeBrand === "iphone" ? "active" : ""}`}
          />
        </li>
        <li className="navbar-item">
          <img
            src={samsung_logo}
            onClick={() => handleBrand("samsung")}
            alt=""
            className={`brand-logo ${
              activeBrand === "samsung" ? "active" : ""
            }`}
          />
        </li>

        <li className="navbar-item">
          <img
            src={xiaomi_logo}
            onClick={() => handleBrand("xiaomi")}
            alt=""
            className={`brand-logo ${activeBrand === "xiaomi" ? "active" : ""}`}
          />
        </li>
        <li className="navbar-item">
          <img
            src={oppo_logo}
            onClick={() => handleBrand("oppo")}
            alt=""
            className={`brand-logo ${activeBrand === "oppo" ? "active" : ""}`}
          />
        </li>
        <li className="navbar-item">
          <img
            src={vivo_logo}
            onClick={() => handleBrand("vivo")}
            alt=""
            className={`brand-logo ${activeBrand === "vivo" ? "active" : ""}`}
          />
        </li>
        <li className="navbar-item">
          <img
            src={masstel_logo}
            onClick={() => handleBrand("masstel")}
            alt=""
            className={`brand-logo ${
              activeBrand === "masstel" ? "active" : ""
            }`}
          />
        </li>
        <li className="navbar-item">
          <img
            src={other_logo}
            onClick={() => handleBrand("other")}
            alt=""
            className={`brand-logo ${activeBrand === "other" ? "active" : ""}`}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
