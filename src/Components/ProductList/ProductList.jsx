// src/components/ProductList.js
import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import Loading from '../Loading/Loading';
import { useProducts } from '../../context/ProductContext';
import list_empty_icom from '../../Assets/img/no-products-found.png';

const ProductList = ({ selectedCategory, filters }) => {
    const allproducts = useProducts();

    // const [allproducts, setProducts] = useState([]);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const data = await ProductService.getProducts();
    //       setProducts(data);
    //     } catch (error) {
    //       console.error("Error fetching products:", error);
    //     }
    //   };

    //   fetchData();
    // }, []);

    const [sortBy, setSortBy] = useState('bestSelling');

    // Hàm sắp xếp sản phẩm
    const sortProducts = (products) => {
        switch (sortBy) {
            case 'priceHighToLow':
                return products.slice().sort((a, b) => b.newPrice - a.newPrice);
            case 'priceLowToHigh':
                return products.slice().sort((a, b) => a.newPrice - b.newPrice);
            case 'bestSelling':
                return products.slice().sort((a, b) => b.numberReview - a.numberReview);
            default:
                return products;
        }
    };

    // Hàm lọc sản phẩm
    const applyFilters = (product) => {
        let passFilters = true; // Mặc định tất cả các điều kiện đều được thỏa mãn

        if (filters.price) {
            switch (filters.price) {
                case '<2':
                    passFilters = passFilters && product.newPrice < 2000000;
                    break;
                case '2-4':
                    passFilters = passFilters && product.newPrice >= 2000000 && product.newPrice <= 4000000;
                    break;
                case '4-7':
                    passFilters = passFilters && product.newPrice >= 4000000 && product.newPrice <= 7000000;
                    break;
                case '7-13':
                    passFilters = passFilters && product.newPrice >= 7000000 && product.newPrice <= 13000000;
                    break;
                case '13-20':
                    passFilters = passFilters && product.newPrice >= 13000000 && product.newPrice <= 20000000;
                    break;
                case '>20':
                    passFilters = passFilters && product.newPrice > 20000000;
                    break;
                default:
                    passFilters = false;
            }
        }

        if (filters.ram) {
            switch (filters.ram) {
                case '<4':
                    passFilters = passFilters && product.ram < 4;
                    break;
                case '4-6':
                    passFilters = passFilters && product.ram >= 4 && product.ram <= 6;
                    break;
                case '6-8':
                    passFilters = passFilters && product.ram >= 6 && product.ram <= 8;
                    break;
                case '>8':
                    passFilters = passFilters && product.ram >= 8;
                    break;
                default:
                    passFilters = false;
            }
        }

        if (filters.rom) {
            switch (filters.rom) {
                case '16':
                    passFilters = passFilters && product.rom === 16;
                    break;
                case '32':
                    passFilters = passFilters && product.rom === 32;
                    break;
                case '64':
                    passFilters = passFilters && product.rom === 64;
                    break;
                case '128':
                    passFilters = passFilters && product.rom === 128;
                    break;
                case '256':
                    passFilters = passFilters && product.rom === 256;
                    break;
                case '512':
                    passFilters = passFilters && product.rom === 512;
                    break;
                default:
                    passFilters = false;
            }
        }
        if (filters.battery) {
            switch (filters.battery) {
                case '<4000':
                    passFilters = passFilters && product.pin < 4000;
                    break;
                case '4000-5000':
                    passFilters = passFilters && product.pin >= 4000 && product.pin <= 5000;
                    break;
                case '>5000':
                    passFilters = passFilters && product.pin > 5000;
                    break;

                default:
                    passFilters = false;
            }
        }
        return passFilters;
    };

    const filteredAndSortedProducts = selectedCategory
        ? allproducts.filter((product) => product.category === selectedCategory && applyFilters(product))
        : allproducts.filter(applyFilters);

    const products = sortProducts(filteredAndSortedProducts);

    return (
        <div className="product-list-container">
            <div className="box-sort">
                <label>Sắp xếp theo </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="bestSelling">Bán chạy</option>
                    <option value="priceHighToLow">Giá từ cao đến thấp</option>
                    <option value="priceLowToHigh">Giá từ thấp đến cao</option>
                </select>
            </div>
            {products.length > 0 ? (
                <ul className="product-list">
                    {products.map((product) => (
                        <ProductItem key={product._id} product={product} />
                    ))}
                </ul>
            ) : allproducts.length == 0 ? (
                <Loading isLoading={true} />
            ) : (
                <div className="list-empty">
                    <img src={list_empty_icom} alt="" />
                </div>
            )}
        </div>
    );
};

export default ProductList;
