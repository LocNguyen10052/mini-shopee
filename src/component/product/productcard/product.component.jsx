import React, { useState } from 'react';
import './product.style.scss'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/user-store/user-seletor';
import { addToCartAction, createCartStart } from '../../../store/cart-store/cart-action';

function Product({ product }) {
    const currentUser = useSelector(selectCurrentUser)
    const [isProcessing, setIsProcessing] = useState(false);
    const {
        productImage,
        productLocation,
        productName,
        productPrice,
        productSoldCount,

    } = product
    const addCartDropBox = async (event) => {
        if (currentUser != null) {
            if (isProcessing) {
                console.log("Đang xử lý, vui lòng chờ...");
                return;
            }
            setIsProcessing(true);
            const productID = product.productID;
            const userID = currentUser.email;
            try {
                const create = await addToCartAction(productID, userID);
                console.log("Sản phẩm đã được thêm vào giỏ hàng:", create);
            } catch (error) {
                console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
            } finally {
                setIsProcessing(false);
            }
        } else {
            window.location.href = "/signIn";
        }
    }; return (
        <Link className="product-card" >
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
            <Button style={{ backgroundColor: '#F9502F', border: '0' }} onClick={addCartDropBox}>Add to cart</Button>
        </Link>
    );
}

export default Product;