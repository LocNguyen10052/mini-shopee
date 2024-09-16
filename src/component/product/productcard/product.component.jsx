import React from 'react';
import PropTypes from 'prop-types';
import './product.style.scss'
import { Link } from 'react-router-dom';


function Product({ product }) {
    const {
        ID,
        createdAt,
        productImage,
        productLocation,
        productName,
        productPrice,
        productSoldCount,
        productTitle
    } = product
    return (
        <Link className="product-card" to={`/product/detail/${ID}`}>
            <img
                src={productImage}
                alt="Thắt lưng nam"
                className="product-card__image"
            />
            <div className="product-card__info">
                <div className="product-card__title limited-text">
                    ⚡ Giá Sốc ⚡ {productName}
                </div>
                <div className="product-card__badges">
                    <span className="badge badge--red">Rẻ Vô Địch</span>
                    <span className="badge badge--orange">#ShopXuHuong</span>
                </div>
                <div className="product-card__pricing">
                    <span className="price--new">{productPrice}</span>
                </div>
                <div className="product-card__stats">
                    <span className="sold">Đã bán {productSoldCount}</span>
                </div>
                <div className="product-card__location">
                    {productLocation}
                </div>
            </div>
        </Link>
    );
}

export default Product;