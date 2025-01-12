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
        <div className='checkout-item-container'>
            <span className='quantity'>
                {!ordered && (
                    <>
                        <div className='image-container'>
                            <img src={cart.productImage} alt={cart.productName} />
                        </div>
                        <span className='name'>{cart.productName}</span>
                        <div className={`arrow ${cart.quality === 1 ? 'disabled' : ''}`} onClick={cart.quality === 1 ? null : removeItemHandler}>
                            &#10094;
                        </div>
                        <span className='value'>{cart.quality}</span>
                        <div className='arrow' onClick={addItemHandler}>
                            &#10095;
                        </div>
                        <span className='price'>{cart.productPrice}</span>
                        <div className='remove-button' onClick={clearItemHandler}>
                            &#10005;
                        </div>
                    </>
                )}

                {ordered && (
                    <Card style={{ marginBottom: 16 }} bordered={false}>
                        <Row align="middle">
                            {/* Image and Product Details */}
                            <Col span={6}>
                                <img
                                    src={cart.productImage}
                                    alt={cart.productName}
                                    style={{ width: '100%', maxHeight: 120, objectFit: 'cover' }}
                                />
                            </Col>
                            <Col span={12} style={{ paddingLeft: 10 }}>
                                {/* Đơn hàng đã được đặt nằm bên trái tên sản phẩm */}
                                <div style={{ color: 'green', marginBottom: 5 }}>
                                    <CheckCircleOutlined /> Đơn hàng đã được đặt
                                </div>
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
                                <Text>Số lượng: {cart.quality}</Text>
                            </Col>
                            {/* Giá tiền */}
                            <Col span={6} style={{ textAlign: 'right' }}>
                                <Text strong style={{ fontSize: 16 }}>
                                    {`₫${(cart.quality * cart.productPrice).toLocaleString()}`}
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                )}
            </span>
        </div>
    );
}

export default CartItem;
