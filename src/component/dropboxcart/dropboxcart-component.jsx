import React from 'react';
import './dropboxcart-style.scss'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { selectCartReducer } from '../../store/cart-store/cart-selector';
import { useSelector } from 'react-redux';


function DropBoxCart() {
    const carts = useSelector(selectCartReducer)
    return (
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
                    <div className='cart-item-container' key={cart.productID}>
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


    );
}

export default DropBoxCart;