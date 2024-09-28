import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addTocart } from '../../../utils/firebase.cart';
import './cartItem.style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/user-store/user-seletor';
import { addToCartAction } from '../../../store/cart-store/cart-action';

function CartItem({ cart }) {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const [quanlity, setQuanlity] = useState(cart.quanlity)

    const removeItemHandler = () => {

    }
    const addItemHandler = async (event) => {
        const newQuantity = quanlity + 1
        setQuanlity(newQuantity)
        await addToCartAction(dispatch, { productID: cart.productID, userID: currentUser.email })
    }
    const clearItemHandler = () => {

    }


    return (
        <div>
            <div>

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
                            <span className='value'>{quanlity}</span>
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

            </div>
        </div>
    );

}
export default CartItem;