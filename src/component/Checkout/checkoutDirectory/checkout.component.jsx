import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectCartReducer } from '../../../store/cart-store/cart-selector';
import './checkout.style.scss'
import { Container } from 'react-bootstrap';
import { addTocart, getCartSnapShoot } from '../../../utils/firebase.cart';
import CartItemComponent from '../cartitem/cartItem.component';


function Checkout() {

    const carts = useSelector(selectCartReducer)
    const [total, setCartTotal] = useState()
    useEffect(() => {
        const newCartTotal = carts.reduce(
            (total, cartItem) => total + cartItem.quanlity * cartItem.productPrice,
            0
        );
        setCartTotal(newCartTotal);
    }, [total, carts])

    return (

        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            <div>
                {carts.map((cart) => (
                    <CartItemComponent cart={cart}></CartItemComponent>
                ))}
            </div>

            <div className='total'>TOTAL: ${total}</div>
        </div>


    );
}

export default Checkout;