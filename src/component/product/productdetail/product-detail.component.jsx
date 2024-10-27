import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findProductByID } from '../../../utils/firebase.createproduct';
import './product-detal.style.scss'
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../store/category-store/category-selector';

function ProductDetail() {
    const [product, setProduct] = useState('');
    const { productID } = useParams();
    const catelgory = useSelector(selectCategories);
    const getProductByID = async () => {
        const ProductByID = await findProductByID(productID);
        setProduct(ProductByID)
    }
    useEffect(() => {
        console.log("render")
        getProductByID();
    }, [])
    return (
        <div className="product-info-detail-card">
            <div className="product-info-detail-image">
                <img src={product.productImage} alt="Product" />
                <div className="product-info-detail-small-images">
                    <img src={product.productImage} alt="Small 1" />

                </div>
            </div>
            <div className="product-info-detail-info">
                <h1>{product.productName}</h1>
                <div className="product-info-detail-rating">
                    <span>4.6</span> <span>(11,1K Đánh Giá)</span>
                </div>
                <div className="product-info-detail-price">
                    {/* <span className="product-info-detail-old-price">₫109.000</span> */}
                    <span className="product-info-detail-discount-price">{product.productPrice}</span>
                    {/* <span className="product-info-detail-discount-percentage">46% GIẢM</span> */}
                </div>
                <div className="product-info-detail-color-options">
                    <label>Màu</label>
                    <div className="product-info-detail-colors">
                        <button className="product-info-detail-color">Trắng NY</button>
                        <button className="product-info-detail-color">Đen NY</button>

                    </div>
                </div>
                <div className="product-info-detail-size-options">
                    <label>Size</label>
                    <div className="product-info-detail-sizes">
                        <button className="product-info-detail-size">M &lt; 45kg</button>
                        <button className="product-info-detail-size">L &lt; 62kg</button>
                        <button className="product-info-detail-size">XL &lt; 72kg</button>
                    </div>
                </div>
                <div className="product-info-detail-quantity">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                </div>
                <div className="product-info-detail-actions">
                    <button className="product-info-detail-add-to-cart">Thêm Vào Giỏ Hàng</button>
                    <button className="product-info-detail-buy-now">Mua Ngay</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;