import React from 'react';
import './cartItem.style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/user-store/user-seletor';
import { updateCartAction, } from '../../../store/cart-store/cart-action';



function CartItem({ cart }) {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const removeItemHandler = async () => {
        await updateCartAction(cart.cartID, "Decrease");
    }
    const addItemHandler = async () => {
        await updateCartAction(cart.cartID, "Increase");
    }
    const clearItemHandler = async () => {
        await updateCartAction(cart.cartID, "Remove");
    }
    return (

        < div className='checkout-item-container' >
            <div className='image-container'>
                <img src={cart.productImage} alt={`Loc`} />
            </div>
            <span className='name'> Tên sản phẩm </span>
            <span className='quantity'>
                <div className={`arrow ${cart.quality === 1 ? 'disabled' : ''}`} onClick={cart.quality === 1 ? null : removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{cart.quality}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{cart.productPrice}</span>
            <div className='remove-button' onClick={clearItemHandler}>
                &#10005;
            </div>
        </div >
    );

}
export default CartItem;