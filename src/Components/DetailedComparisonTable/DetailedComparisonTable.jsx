import React, { useContext, useState } from 'react';
import './DetailedComparisonTable.css';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoMdAdd } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import ViewedProducts from '../ViewedProducts/ViewedProducts';

const DetailedComparisonTable = ({ setShowComparisonTable }) => {
    const { getViewedProducts, compareList, removeFromCompareList } = useContext(ShopContext);

    const [showViewedProducts, setShowViewedProducts] = useState(false);

    const handleShowViewedProducts = () => {
        setShowViewedProducts(true);
    };

    const handleClose = () => {
        setShowComparisonTable(false);
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div>
            <div className="detailed-comparison-list">
                <IoMdCloseCircleOutline className="close-icon" onClick={handleClose} />
                <table>
                    <thead>
                        <tr>
                            <th style={{ fontSize: '30px', color: '#555555' }}>So Sánh</th>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <th key={index}>
                                    {compareList[index] ? (
                                        <div className="product-info">
                                            <IoCloseSharp
                                                className="remove"
                                                onClick={() => removeFromCompareList(compareList[index]._id)}
                                            />
                                            <img src={compareList[index].imageUrl} className="product-img" alt="" />
                                            <div className="product-name-price">
                                                <div className="name">{compareList[index].name}</div>
                                                <div className="price">
                                                    <div className="new-price">
                                                        {compareList[index].newPrice.toString().length >= 8
                                                            ? compareList[index].newPrice
                                                                  .toString()
                                                                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                                            : compareList[index].newPrice
                                                                  .toString()
                                                                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div className="add-icon" onClick={handleShowViewedProducts}>
                                                <IoMdAdd />
                                            </div>
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            'Chip',
                            'RAM',
                            'ROM',
                            'Màn hình',
                            'Pin',
                            'Camera trước',
                            'Camera sau',
                            'Tốc độ sạc',
                            'Hãng',
                        ].map((attribute, index) => (
                            <tr key={index}>
                                <td className="title">{attribute}</td>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>
                                        {compareList[index] &&
                                            (attribute === 'Chip'
                                                ? compareList[index].chip
                                                : attribute === 'RAM'
                                                ? compareList[index].ram + ' GB'
                                                : attribute === 'ROM'
                                                ? compareList[index].rom + ' GB'
                                                : attribute === 'Màn hình'
                                                ? compareList[index].screen
                                                : attribute === 'Pin'
                                                ? compareList[index].pin + ' mAh'
                                                : attribute === 'Camera trước'
                                                ? compareList[index].selfieCam
                                                : attribute === 'Camera sau'
                                                ? compareList[index].behindCam
                                                : attribute === 'Tốc độ sạc'
                                                ? compareList[index].chargeSpeed + ' W'
                                                : attribute === 'Hãng'
                                                ? capitalizeFirstLetter(compareList[index].category)
                                                : null)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td className="title"></td>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <td key={index} style={{ textAlign: 'center' }}>
                                    {compareList[index] && (
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            to={`/product/${compareList[index].slug}`}
                                            onClick={handleClose}
                                        >
                                            <button className="btn-buy">Mua ngay</button>
                                        </Link>
                                    )}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            {showViewedProducts && (
                <>
                    <div className="backdrop-showViewedProducts "></div>
                    <ViewedProducts
                        viewedProducts={getViewedProducts()}
                        setShowViewedProducts={setShowViewedProducts}
                    />
                </>
            )}
        </div>
    );
};

export default DetailedComparisonTable;
