import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItemsTotal, selectCartReducer } from '../../../store/cart-store/cart-selector';
import './checkout.style.scss'
import CartItemComponent from '../cartitem/cartItem.component';


function Checkout() {
    const cartsTotal = useSelector(selectCartItemsTotal)
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
                    <span>Quatity</span>
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

            <div className='total'>TOTAL: ${cartsTotal}</div>
        </div>
    );
}

export default Checkout;