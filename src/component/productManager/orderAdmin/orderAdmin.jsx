import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Typography, Card, Row, Col, Table } from 'antd';
import { selectorOrder } from '../../../store/order-store/order-selector';
import { ExportOutlined } from '@ant-design/icons';
import { selectCartFull } from '../../../store/cart-store/cart-selector';

const { Text } = Typography;

function OrderAdmin() {
    const orderAdmin = useSelector(selectorOrder);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const cartFull = useSelector(selectCartFull);
    const [orderCart, setOrderCart] = useState();
    const handleCancel = () => {
        setIsModalOpen(!isModalOpen);
    }

    const showModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(!isModalOpen);
    }

    const mapOrderCart = () => {
        const orderCartUpdate = orderAdmin.map(order => order.cartsID.map(cartid => cartFull.find(cart => cart.cartID === cartid)));
        setOrderCart(orderCartUpdate);
    }
    useEffect(() => {
        mapOrderCart();
    }, [orderAdmin, cartFull])

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
            render: (record) => {
                const date = new Date(record.seconds * 1000); // Chuyển đổi từ timestamp giây sang ngày
                return date.toLocaleString(); // Định dạng ngày theo locale
            }
        },
        {
            title: 'Discount',
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
            <Table dataSource={orderAdmin} columns={columns} bordered />

            {selectedOrder && (
                <Modal
                    title="Thông tin đơn hàng"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                    width={600}
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
                        {orderCart.map((carts) => carts.map(cartItem => ((
                            <Row key={cartItem.cartID} style={{ marginBottom: 10 }}>
                                <Col span={12}>
                                    <Text strong>ID sản phẩm: </Text>
                                    {cartItem.cartID}
                                </Col>
                                <Col span={12}>
                                    <Text strong>Số lượng: </Text>
                                    {cartItem.quality}
                                </Col>
                            </Row>
                        ))))}
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
