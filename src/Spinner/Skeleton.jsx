import React from 'react';
import './Skeleton.css'; // Để định nghĩa CSS cho hiệu ứng skeleton

const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
        </div>
    );
};

export default SkeletonCard;
