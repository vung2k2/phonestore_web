import React, { useState, useEffect, useRef } from 'react';
import './Search.css';
import { useProducts } from '../../context/ProductContext';
import { Link } from 'react-router-dom';

const Search = () => {
    const products = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showPopover, setShowPopover] = useState(false);
    const inputRef = useRef(null);

    const handleChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleLinkClick = () => {
        setSearchTerm(''); // Đặt giá trị của ô input thành rỗng khi click vào Link
        setShowPopover(false); // Đóng popover khi click vào Link
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            // Kiểm tra xem click xảy ra ngoài ô input không
            setShowPopover(false); // Đóng popover nếu click xảy ra ngoài ô input
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]); // Nếu không có từ khóa tìm kiếm, hiển thị kết quả rỗng
            setShowPopover(false);
        } else {
            const searchKeywords = searchTerm.split(' ').filter(Boolean); // Tách từ khóa và loại bỏ từ rỗng
            const results = products.filter((product) =>
                searchKeywords.every(
                    (keyword) => product.name.toLowerCase().includes(keyword), // Kiểm tra xem tất cả các từ khóa có tồn tại trong tên sản phẩm không
                ),
            );
            setSearchResults(results);
            setShowPopover(results.length > 0); // Hiển thị popover chỉ khi có kết quả tìm kiếm
        }
    }, [searchTerm, products]);

    return (
        <div className="search-box" ref={inputRef}>
            <input
                type="search"
                name="search-w"
                autoComplete="on"
                placeholder="Bạn cần tìm gì?"
                value={searchTerm}
                onChange={handleChange}
                onClick={() => setShowPopover(searchResults.length > 0)} // Hiển thị popover khi click vào ô input nếu có kết quả tìm kiếm
            />
            <button type="submit">Tìm kiếm</button>
            {showPopover && (
                <div className="search-results">
                    {searchResults.map((product, index) => (
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={`/product/${product.slug}`}
                            onClick={handleLinkClick} // Gọi hàm handleLinkClick khi click vào Link
                            key={index}
                        >
                            <div className="search-result-item">{product.name}</div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
