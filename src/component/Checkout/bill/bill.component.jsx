import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

function Bill({ data }) {
    const { cartsTotal, shipCost, couponProductCost, couponShipCost, orderTotal } = data;

    // Tính tổng tiền cuối cùng
    const finalAmount = cartsTotal + shipCost - couponProductCost - couponShipCost;

    return (
        <Card
            title="Chi tiết hóa đơn"
            bordered={true}
            style={{ width: 400, margin: '5px auto' }}
        >
            <Row justify="space-between" align="middle">
                <Col>
                    <Text strong>Tổng tiền hàng:</Text>
                </Col>
                <Col>
                    <Text>{cartsTotal.toLocaleString()} VND</Text>
                </Col>
            </Row>
            <Row justify="space-between" align="middle" style={{ marginTop: 5 }}>
                <Col>
                    <Text strong>Phí vận chuyển:</Text>
                </Col>
                <Col>
                    <Text>{shipCost.toLocaleString()} VND</Text>
                </Col>
            </Row>
            <Row justify="space-between" align="middle" style={{ marginTop: 5 }}>
                <Col>
                    <Text strong>Giảm giá đơn hàng từ coupon:</Text>
                </Col>
                <Col>
                    <Text>-{couponProductCost.toLocaleString()} VND</Text>
                </Col>
            </Row>
            <Row justify="space-between" align="middle" style={{ marginTop: 5 }}>
                <Col>
                    <Text strong>Giảm giá ship từ coupon:</Text>
                </Col>
                <Col>
                    <Text>-{couponShipCost.toLocaleString()} VND</Text>
                </Col>
            </Row>
            <Row justify="space-between" align="middle" style={{ marginTop: 20, borderTop: '1px solid #f0f0f0', paddingTop: 10 }}>
                <Col>
                    <Title level={4}>Tổng thanh toán:</Title>
                </Col>
                <Col>
                    <Title level={4} style={{ color: '#52c41a' }}>
                        {finalAmount.toLocaleString()} VND
                    </Title>
                </Col>
            </Row>
        </Card>
    );
}

export default Bill;