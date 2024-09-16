import React from 'react';
import './Banner.scss';

function Banne() {
    return (
        <div className="banner">
            <div className="sale-info">
                <h1>9.9 NGÀY SIÊU MUA SẮM</h1>
                <div className="promo">
                    <span>SĂN VOUCHER ĐẾN <strong>50%</strong></span>
                    <span>PHÍ SHIP <strong>0 Đ</strong></span>
                    <span>CƠ HỘI TRÚNG <strong>99 iPhone</strong></span>
                </div>
                <p>26.8 - 11.9</p>
            </div>
        </div>
    );
};

export default Banner;
