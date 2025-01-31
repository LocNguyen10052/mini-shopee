import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Typography, Card, Row, Col, Table } from 'antd';
import { selectorOrder } from '../../../store/order-store/order-selector';
import { ExportOutlined } from '@ant-design/icons';
import { selectCartFull } from '../../../store/cart-store/cart-selector';
import { selectorProduct } from '../../../store/product-store/product-selector';
import { updateCartShip } from '../../../utils/firebase.cart';
import { setAdminCartFullDATA } from '../../../store/cart-admin-store/cart-admin-action';
import { selectorCartFullAdmin } from '../../../store/cart-admin-store/cart-admin-selector';

const { Text } = Typography;

function OrderAdmin() {
    const orderAdmin = useSelector(selectorOrder);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    //cartData
    const cartFull = useSelector(selectCartFull);
    //order + cartdata
    const orderCart = useSelector(selectorCartFullAdmin);
    const product = useSelector(selectorProduct);
    const dispatch = useDispatch();
    const handleCancel = () => {
        setIsModalOpen(!isModalOpen);
    }

    const showModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(!isModalOpen);
    }
    const handleShipOrder = async (cartItem) => {
        await updateCartShip(cartItem.productID, cartItem.quality, cartItem.cartID)
    }
    const mapOrderCart = () => {

        if (orderAdmin && orderAdmin.length > 0 && cartFull.length > 0 && product.length > 0) {
            // Bước 1: Merge dữ liệu từ cartFull và product
            const cartsFullData = cartFull.map(cartItem => {
                const productData = product.find(prod => prod.productID === cartItem.productID);
                return {
                    ...cartItem,
                    ...productData,
                };
            });
            //Merge orderAdmin với cartsFullData
            const orderCartUpdate = orderAdmin.map(order => {
                const cartDetails = order.cartsID.map(cartID => {
                    return cartsFullData.find(cart => cart.cartID === cartID);
                }).filter(Boolean);
                return {
                    ...order,
                    cartDetails: cartDetails
                };
            });
            // Bước 3: Set kết quả vào state
            dispatch(setAdminCartFullDATA(orderCartUpdate))

        }
    };

    useEffect(() => {
        mapOrderCart();
        if (selectedOrder) {
            const updatedOrder = orderCart.find(order => order.orderID === selectedOrder.orderID);
            setSelectedOrder(updatedOrder || null);
        }
    }, [orderAdmin, cartFull, product])

    const columns = [
        {
            title: 'ID Order',
            dataIndex: 'orderID',
            key: 'orderID',
        },
        {
            title: 'Email Khách hàng',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createAt) => {
                if (!createAt || !createAt.seconds) return 'N/A'; // Handle missing or invalid data
                return new Date(createAt.seconds * 1000).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });
            },
        },
        {
            title: 'Chi tiết',
            dataIndex: 'discount',
            key: 'discount',
            render: (_, record) => (
                <Button
                    type='link'
                    icon={<ExportOutlined />}
                    onClick={() => showModal(record)} // Mở modal khi nhấn vào Discount
                />
            ),
        },
    ];

    return (
        <div>
            <Table dataSource={orderCart} columns={columns} bordered />

            {selectedOrder && (
                <Modal
                    title="Thông tin đơn hàng"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                    width={1000}
                >
                    <Card title="Thông tin người nhận" style={{ marginBottom: 20 }}>
                        <Row>
                            <Col span={12}>
                                <Text strong>Họ và tên: </Text>
                                {selectedOrder.form.fullName}
                            </Col>
                            <Col span={12}>
                                <Text strong>Số điện thoại: </Text>
                                {selectedOrder.form.phoneNumber}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Text strong>Địa chỉ: </Text>
                                {selectedOrder.form.address + ","}
                                {selectedOrder.form.ditrict.join(", ")}
                            </Col>
                        </Row>
                    </Card>

                    <Card title="Thông tin giỏ hàng" style={{ marginBottom: 20 }}>
                        {console.log(selectedOrder.cartDetails, orderCart)}
                        {selectedOrder.cartDetails && selectedOrder.cartDetails.map((cartItem) =>
                            <Row key={cartItem.cartID} style={{ marginBottom: 10 }}>
                                <Col span={8}>
                                    <Text strong>ID sản phẩm: </Text>
                                    {cartItem.productID}
                                </Col>
                                <Col span={4}>
                                    <Text strong>Số lượng: </Text>
                                    {cartItem.quality}
                                </Col>
                                <Col span={4}>
                                    <Text strong>Số lượng kho: </Text>
                                    {cartItem.productSoldCount}
                                </Col>
                                <Col span={4}>
                                    <Text strong>Số tiền: </Text>
                                    {(cartItem.productPrice * cartItem.quality).toLocaleString()}
                                </Col>
                                <Col span={4}>
                                    {/* Kiểm tra số lượng quality và productSoldCount */}
                                    {cartItem.quality > cartItem.productSoldCount ? (
                                        <Button danger onClick={() => handleShipOrder(cartItem)}>
                                            Thông báo
                                        </Button>
                                    ) : cartItem.shiped ? (

                                        <Button type="primary" disabled>
                                            {console.log(cartItem.shiped)}
                                            Đang giao hàng
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleShipOrder(cartItem)}>Giao hàng{console.log(cartItem.shiped)}</Button>
                                    )}
                                </Col>
                            </Row>
                        )}
                    </Card>


                    <Card title="Thông tin đơn hàng" style={{ marginBottom: 20 }}>
                        <Row>
                            <Col span={12}>
                                <Text strong>ID đơn hàng: </Text>
                                {selectedOrder.orderID}
                            </Col>
                            <Col span={12}>
                                <Text strong>Email khách hàng: </Text>
                                {selectedOrder.email}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Text strong>Ngày đặt hàng: </Text>
                                {new Date(selectedOrder.createdAt.seconds * 1000).toLocaleString()}
                            </Col>
                        </Row>
                    </Card>
                </Modal>
            )
            }
        </div >
    );
}

export default OrderAdmin;
