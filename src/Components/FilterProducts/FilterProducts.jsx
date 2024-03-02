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
          <option value="below100">Dưới 2 triệu</option>
          <option value="100to500">Từ 2 - 4 triệu</option>
          <option value="above500">Từ 4 - 7 triệu</option>
          <option value="above500">Từ 7 - 13 triệu</option>
          <option value="above500">Từ 13 - 20 triệu</option>
          <option value="above500">Trên 20 triệu</option>
        </select>
      </div>
      <div className={`filter-item ${ramActive ? "active" : ""}`}>
        <label>Ram:</label>
        <select value={ram} onChange={handleRamChange}>
          <option value="">Tất cả</option>
          <option value="1">1GB</option>
          <option value="2">2GB</option>
          <option value="3">3GB</option>
          <option value="4">4GB</option>
        </select>
      </div>
      <div className={`filter-item ${romActive ? "active" : ""}`}>
        <label>Bộ nhớ trong:</label>
        <select value={rom} onChange={handleRomChange}>
          <option value="">Tất cả</option>
          <option value="32gb">32GB</option>
          <option value="64gb">64GB</option>
          <option value="128gb">128GB</option>
        </select>
      </div>
      <div className={`filter-item ${batteryActive ? "active" : ""}`}>
        <label>Dung lượng pin:</label>
        <select value={battery} onChange={handleBatteryChange}>
          <option value="">Tất cả</option>
          <option value="below2000">Dưới 2000 mAh</option>
          <option value="2000to4000">Từ 2000-4000 mAh</option>
          <option value="above4000">Trên 4000 mAh</option>
        </select>
      </div>

      <button onClick={applyFilters}>Tìm</button>
    </div>
  );
};

export default FilterProducts;
