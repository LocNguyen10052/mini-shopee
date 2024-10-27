import React from 'react';
import './product.style.scss'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/user-store/user-seletor';
import { addToCartAction } from '../../../store/cart-store/cart-action';

function Product({ product }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser)
    const {
        ID,
        createdAt,
        productImage,
        productLocation,
        productName,
        productPrice,
        productSoldCount,

    } = product
    const addCartDropBox = async (event) => {
        const productID = product.productID
        const userID = currentUser.email
        await addToCartAction(dispatch, { productID, productImage, productName, productPrice }, userID)
        alert("Add success " + productName)
    }
    return (
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