import React from 'react';
import './DetailedComparisonTable.css';
import { IoCloseSharp } from 'react-icons/io5';

const DetailedComparisonTable = ({ compareList, setShowComparisonTable }) => {
    const handleClose = () => {
        setShowComparisonTable(false); // Đặt giá trị của biến state showComparisonTable thành false
    };
    return (
        <div className="detailed-comparison-table">
            <IoCloseSharp className="close-icon" onClick={handleClose} />
        </div>
    );
};

export default DetailedComparisonTable;
