import React, { useContext, useState, useEffect } from 'react';
import './CompareList.css';
import { ShopContext } from '../../context/ShopContext';
import { IoMdAdd } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import DetailedComparisonTable from '../DetailedComparisonTable/DetailedComparisonTable';
import ViewedProducts from '../ViewedProducts/ViewedProducts';

const CompareList = () => {
    const { getViewedProducts, compareList, removeFromCompareList, removeAllFromCompareList } = useContext(ShopContext);
    // const viewedProducts = getViewedProducts();
    const [showComparisonTable, setShowComparisonTable] = useState(false);
    const [showViewedProducts, setShowViewedProducts] = useState(false);
    const [showCompareList, setShowCompareList] = useState(false);

    useEffect(() => {
        const body = document.body;
        if (showComparisonTable || showViewedProducts) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'unset';
        }
        return () => {
            body.style.overflow = 'unset';
        };
    }, [showComparisonTable, showViewedProducts]);

    const handleShowCompareList = () => {
        setShowCompareList(true);
    };

    const handleHideCompareList = () => {
        setShowCompareList(false);
    };

    const handleShowViewedProducts = () => {
        setShowViewedProducts(true);
    };

    const handleShowComparisonTable = () => {
        setShowComparisonTable(true);
    };

    const handleCloseComparisonTable = () => {
        setShowComparisonTable(false);
    };

    return (
        <div>
            {!showCompareList && (
                <span className="show-compare-modal" onClick={handleShowCompareList}>
                    {`So sánh(${compareList.length})`}
                </span>
            )}
            <div className="compare">
                {showCompareList && (
                    <div className="compare-list">
                        {[...Array(3)].map((_, index) => {
                            const item = compareList[index];
                            return (
                                <div key={index} className="compare-item">
                                    {item ? (
                                        <>
                                            <IoCloseSharp
                                                className="remove"
                                                onClick={() => removeFromCompareList(item.id)}
                                            />
                                            <img src={item.imageUrl} alt={item.name} />
                                            <p>{item.name}</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="add-icon" onClick={handleShowViewedProducts}>
                                                <IoMdAdd />
                                            </div>
                                            <p>Thêm sản phẩm</p>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                        <div className="compare-item">
                            <IoMdCloseCircleOutline
                                style={{ fontSize: '30', top: '0', right: '0' }}
                                className="remove"
                                onClick={handleHideCompareList}
                            />
                            <button
                                onClick={() => {
                                    handleShowComparisonTable();
                                    handleHideCompareList();
                                }}
                            >
                                So sánh ngay
                            </button>
                            <p className="remove-all" onClick={() => removeAllFromCompareList()}>
                                Xóa tất cả sản phẩm
                            </p>
                        </div>
                    </div>
                )}
                {showComparisonTable && (
                    <>
                        <div className="backdrop"></div>
                        <DetailedComparisonTable setShowComparisonTable={setShowComparisonTable} />
                    </>
                )}
                {showViewedProducts && (
                    <>
                        <div className="backdrop"></div>
                        <ViewedProducts
                            viewedProducts={getViewedProducts()}
                            setShowViewedProducts={setShowViewedProducts}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default CompareList;
