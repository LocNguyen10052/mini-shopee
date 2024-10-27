import React, { useState } from 'react';
import './cartItem.style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/user-store/user-seletor';
import { addToCartAction, deleteCartAction, removeCartAction } from '../../../store/cart-store/cart-action';

function CartItem({ cart }) {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const removeItemHandler = async () => {
        await removeCartAction(dispatch, cart, currentUser.email)
    }
    const addItemHandler = async (event) => {
        await addToCartAction(dispatch, cart, currentUser.email)
    }
    const clearItemHandler = async () => {
        await deleteCartAction(dispatch, cart, currentUser.email)
    }

    return (

        <div key={cart.productID}>
            <div className='checkout-item-container'>
                <div className='image-container'>
                    <img src={cart.productImage} alt={`${cart.productName}`} />
                </div>
                <span className='name'> {cart.productName} </span>
                <span className='quantity'>
                    <div className='arrow' onClick={removeItemHandler}>
                        &#10094;
                    </div>
                    <span className='value'>{cart.quality}</span>
                    <div className='arrow' onClick={addItemHandler}>
                        &#10095;
                    </div>
                </span>
                <span className='price'> {cart.productPrice}</span>
                <div className='remove-button' onClick={clearItemHandler}>
                    &#10005;
                </div>
            </div>
        </div>
    );

}
export default CartItem;