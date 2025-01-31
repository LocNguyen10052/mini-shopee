import React from 'react';
import './cartItem.style.scss';
import { updateCartAction } from '../../../store/cart-store/cart-action';
import { Row, Col, Card, Typography, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function CartItem({ cart, ordered }) {
    const removeItemHandler = async () => {
        await updateCartAction(cart.cartID, "Decrease");
    };
    const addItemHandler = async () => {
        await updateCartAction(cart.cartID, "Increase");
    };
    const clearItemHandler = async () => {
        await updateCartAction(cart.cartID, "Remove");
    };

    return (
        <div>
            {!ordered && (
                <div className='checkout-item-container'>
                    <div className='image-container'>
                        <img src={cart.productImage} alt={`${cart.productName}`} />
                    </div>
                    <span className='name'>
                        <Title
                            level={5}
                            style={{
                                marginBottom: 5,

                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {cart.productName}
                        </Title>
                    </span>
                    <span className='quantity'>
                        <div className='arrow' onClick={removeItemHandler}>
                            &#10094;
                        </div>
                        <span className='value'>{cart.quality}</span>
                        <div className='arrow' onClick={addItemHandler}>
                            &#10095;
                        </div>
                    </span>
                    <span className="price">
                        {(cart.productPrice ? cart.productPrice.toLocaleString() : "0")} đ
                    </span>
                    <div className='remove-button' onClick={clearItemHandler}>
                        &#10005;
                    </div>
                </div>
            )}
            {ordered && (
                <>
                    <div
                        className={`ordered-header ${cart.shiped ? 'shipped' : 'not-shipped'}`}
                    >
                        <Title
                            level={4}
                            style={{
                                marginBottom: 20,
                                color: cart.shiped ? 'green' : 'orange', // Màu sắc dựa trên trạng thái shiped
                                textAlign: 'left',
                            }}
                        >
                            {cart.shiped ? 'Đã được giao hàng' : 'Đã đặt hàng'}
                        </Title>
                    </div>
                    <div className='checkout-item-container'>
                        <div className='image-container'>
                            <img src={cart.productImage} alt={`${cart.productName}`} />
                        </div>
                        <span className='name'>
                            <Title
                                level={5}
                                style={{
                                    marginBottom: 5,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {cart.productName}
                            </Title>
                            <>x {cart.quality}</>
                        </span>
                        <span className='quantity'>
                            <div style={{ color: 'green', marginBottom: 5 }}>
                                <CheckCircleOutlined /> Đơn hàng đã được đặt
                            </div>
                        </span>
                        <span className='price'> {(cart.productPrice ? cart.productPrice.toLocaleString() : "0")} đ</span>
                        <div className='remove-button'>
                            <Title
                                level={5}
                                style={{
                                    marginBottom: 5,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {(cart.quality && cart.productPrice ? (cart.quality * cart.productPrice).toLocaleString() : "0")} đ
                            </Title>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

export default CartItem;
