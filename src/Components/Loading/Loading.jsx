import React from 'react';
import './Loading.css';

// Loading.jsx
const Loading = ({ isLoading }) => {
    return isLoading ? (
        <div className="loading-overlay">
            <div className="loading-spinner"></div>
        </div>
    ) : null;
};

export default Loading;
