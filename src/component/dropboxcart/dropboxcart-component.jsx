import React, { useEffect } from 'react';
import './dropboxcart-style.scss'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { selectCartDataFull, selectCartItems, selectCartProductData, selectProductID } from '../../store/cart-store/cart-selector';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Spinner/spinner.component';
import { mergaCartAndProductData } from '../../utils/firebase.cart';
import { setCartData } from '../../store/cart-store/cart-action';

function DropBoxCart() {
    const carts = useSelector(selectCartItems);
    const productIDCartArray = useSelector(selectProductID);
    const productCartData = useSelector(selectCartProductData);
    const dispatch = useDispatch();
    const cartsData = useSelector(selectCartDataFull);

    const mergeCartProduct = () => {
        const cartsDatamerge = mergaCartAndProductData(carts, productCartData);
        dispatch(setCartData(cartsDatamerge));
    };

    useEffect(() => {
        mergeCartProduct();
    }, [productIDCartArray, productCartData, carts]);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartsData.length === 0 ? (
                    <Spinner />
                ) : (
                    cartsData.map((cart) => (
                        <div className='cart-item-container' key={cart.productID}>
                            <img src={cart.productImage} alt={`${cart.productName}`} />
                            <div className='item-details'>
                                <span className='name'>{cart.productName}</span>
                                <span className='price'>
                                    {cart.quality} x ${cart.productPrice}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Link to='/checkout'>
                <Button style={{ marginTop: '10px' }}>Check Out</Button>
            </Link>
        </div>
    );
}

export default DropBoxCart;
