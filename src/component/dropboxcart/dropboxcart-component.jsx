import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './dropboxcart-style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCarts } from '../../store/cart-store/cart-selector';
import { selectCurrentUser } from '../../store/user-store/user-seletor';
import { getCart } from '../../utils/firebase.cart';
import { setCart } from '../../store/cart-store/cart-action';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function DropBoxCart() {
    const carts = useSelector(getCarts)
    const currentUser = useSelector(selectCurrentUser)


    return (
        <div>
            <div className='cart-dropdown-container'>
                <div className='cart-items'>
                    {carts.map((cart) => (
                        // <div  >
                        //     <img
                        //         src={cart.productImage}
                        //         alt="Thắt lưng nam"
                        //     />
                        //     <div>{cart.productName}</div>
                        //     <div>{cart.quanlity}</div>
                        //     <div>{cart.productPrice}</div>
                        // </div>
                        <div className='cart-item-container'>
                            <img src={cart.productImage} alt={`${cart.productName}`} />
                            <div className='item-details'>
                                <span className='name'>{cart.productName}</span>
                                <span className='price'>
                                    {cart.quanlity} x ${cart.productPrice}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to={'/checkout'}><Button style={{ marginTop: '10px' }}>Check Out</Button></Link>
            </div>

        </div>



    );
}

export default DropBoxCart;