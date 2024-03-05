import React, { useState } from "react";
import "./FilterProducts.css";

const FilterProducts = ({ handleFilters }) => {
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const [battery, setBattery] = useState("");
  const [price, setPrice] = useState("");
  const [priceActive, setPriceActive] = useState(false);
  const [ramActive, setRamActive] = useState(false);
  const [romActive, setRomActive] = useState(false);
  const [batteryActive, setBatteryActive] = useState(false);

  const handleRamChange = (event) => {
    setRam(event.target.value);
    setRamActive(event.target.value !== "");
  };

  const handleRomChange = (event) => {
    setRom(event.target.value);
    setRomActive(event.target.value !== "");
  };

  const handleBatteryChange = (event) => {
    setBattery(event.target.value);
    setBatteryActive(event.target.value !== "");
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setPriceActive(event.target.value !== "");
  };

  const applyFilters = () => {
    const filters = {
      ram: ram,
      rom: rom,
      battery: battery,
      price: price,
    };
    handleFilters(filters);
  };

  return (
    <div className="filter-container">
      <div className={`filter-item ${priceActive ? "active" : ""}`}>
        <label>Giá:</label>
        <select value={price} onChange={handlePriceChange}>
          <option value="">Tất cả</option>
          <option value="<2">Dưới 2 triệu</option>
          <option value="2-4">Từ 2 - 4 triệu</option>
          <option value="4-7">Từ 4 - 7 triệu</option>
          <option value="7-13">Từ 7 - 13 triệu</option>
          <option value="13-20">Từ 13 - 20 triệu</option>
          <option value=">20">Trên 20 triệu</option>
        </select>
      </div>
      <div className={`filter-item ${ramActive ? "active" : ""}`}>
        <label>Ram:</label>
        <select value={ram} onChange={handleRamChange}>
          <option value="">Tất cả</option>
          <option value="<4">Dưới 4GB</option>
          <option value="4-6">Từ 4-6GB</option>
          <option value="6-8">Từ 6-8GB</option>
          <option value=">8">Trên 8GB</option>
        </select>
      </div>
      <div className={`filter-item ${romActive ? "active" : ""}`}>
        <label>Bộ nhớ trong:</label>
        <select value={rom} onChange={handleRomChange}>
          <option value="">Tất cả</option>
          <option value="16">16GB</option>
          <option value="32">32GB</option>
          <option value="64">64GB</option>
          <option value="128">128GB</option>
          <option value="256">256GB</option>
          <option value="512">512GB</option>
        </select>
      </div>
      <div className={`filter-item ${batteryActive ? "active" : ""}`}>
        <label>Dung lượng pin:</label>
        <select value={battery} onChange={handleBatteryChange}>
          <option value="">Tất cả</option>
          <option value="<4000">Dưới 4000 mAh</option>
          <option value="4000-5000">Từ 4000-5000 mAh</option>
          <option value=">5000">Trên 5000 mAh</option>
        </select>
      </div>

      <button onClick={applyFilters}>Tìm</button>
    </div>
  );
};

export default FilterProducts;
