import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, InputNumber, notification, Table, Row, Col } from 'antd';
import { createCoupon, getAllCoupon } from '../../../utils/firebase.coupon';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../store/category-store/category-selector';

const { Option } = Select;

function Coupon() {
    const [couponType, setCouponType] = useState("discount");
    const [form] = Form.useForm();
    const [coupons, setCoupons] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false); // Trạng thái hiển thị form
    const categories = useSelector(selectCategories)
    const handleTypeChange = (value) => {
        setCouponType(value);
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const onFinish = (values) => {
        const formattedValues = {
            ...values,
            coupon_start_date: values.coupon_start_date.format("DD/MM/YYYY"),
            coupon_end_date: values.coupon_end_date.format("DD/MM/YYYY"),
        };

        createCoupon(formattedValues)
            .then(() => {
                notification.success({
                    message: 'Coupon tạo thành công!',
                });
                form.resetFields();
                fetchCoupons();
                setIsFormVisible(false); // Đóng form sau khi tạo xong
            })
            .catch((err) => {
                notification.error({
                    message: 'Lỗi khi tạo coupon!',
                    description: err.message,
                });

            });
    };

    const fetchCoupons = async () => {
        try {
            const fetchedCoupons = await getAllCoupon();
            setCoupons(fetchedCoupons || []);
        } catch (error) {
            console.error("Lỗi khi tải danh sách coupon:", error);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const columns = [
        {
            title: 'Mã Coupon',
            dataIndex: 'coupon_code',
            key: 'coupon_code',
        },
        {
            title: 'Loại Coupon',
            dataIndex: 'coupon_type',
            key: 'coupon_type',
        },
        {
            title: 'Giá trị',
            dataIndex: 'coupon_value',
            key: 'coupon_value',
            render: (value) => value ? `${value} VNĐ` : 'N/A',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'coupon_start_date',
            key: 'coupon_start_date',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'coupon_end_date',
            key: 'coupon_end_date',
        },
        {
            title: 'Giá trị đơn hàng tối thiểu',
            dataIndex: 'coupon_min_order_value',
            key: 'coupon_min_order_value',
            render: (value) => value ? `${value} VNĐ` : 'N/A',
        },
        {
            title: 'Số lượng',
            dataIndex: 'coupon_quantity',
            key: 'coupon_quantity',
        },
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '90%', margin: 'auto' }}>
            <h2>Danh sách Coupon</h2>
            <Button
                type="primary"
                onClick={toggleFormVisibility}
                style={{ marginBottom: '20px' }}
            >
                {isFormVisible ? 'Ẩn Form Tạo Coupon' : 'Tạo Coupon'}
            </Button>

            {isFormVisible && (
                <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
                    <h3>Tạo Coupon</h3>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        initialValues={{
                            coupon_type: 'discount',
                        }}
                        layout="vertical"
                    >
                        {/* Mã counpon */}
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} lg={8}>
                                <Form.Item
                                    label="Coupon Mã"
                                    name="coupon_code"
                                    rules={[{ required: true, message: 'Vui lòng nhập mã coupon!' }]}
                                >
                                    <Input placeholder="Nhập mã coupon" />
                                </Form.Item>
                            </Col>
                            {/* Mã loại coupon */}
                            <Col xs={24} sm={12} lg={8}>
                                <Form.Item
                                    label="Coupon Loại"
                                    name="coupon_type"
                                    rules={[{ required: true, message: 'Vui lòng chọn loại coupon!' }]}
                                >
                                    <Select onChange={handleTypeChange}>
                                        <Option value="discount">Giảm giá</Option>
                                        <Option value="free_shipping">Miễn phí vận chuyển</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            {couponType === 'discount' && (
                                <Col xs={24} sm={12} lg={8}>
                                    <Form.Item
                                        label="Coupon Giá trị"
                                        name="coupon_value"
                                        rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm!' }]}

                                    >
                                        <InputNumber
                                            min={1}
                                            max={1000000}
                                            formatter={(value) => `${value} VNĐ`}
                                            parser={(value) => value.replace(' VNĐ', '')}
                                            placeholder="Nhập giá trị giảm"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                            )}

                            {couponType === 'free_shipping' && (
                                <Col xs={24} sm={12} lg={8}>
                                    <Form.Item
                                        label="Coupon Giá trị"
                                        name="coupon_value"
                                        initialValue={100000}
                                    >
                                        <InputNumber
                                            disabled
                                            formatter={(value) => `${value} VNĐ`}
                                            parser={(value) => value.replace(' VNĐ', '')}
                                            placeholder="Nhập giá trị miễn phí vận chuyển"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                            )}

                            <Col xs={24} sm={12} lg={8}>
                                <Form.Item
                                    label="Coupon Thời gian bắt đầu"
                                    name="coupon_start_date"
                                    rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' },
                                    () => ({
                                        validator(_, value) {
                                            const endDate = form.getFieldValue('coupon_end_date');
                                            if (!value || !endDate || value.isBefore(endDate)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc!')); // Xác thực thất bại
                                        },
                                    })

                                    ]}

                                >
                                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} lg={8}>
                                <Form.Item
                                    label="Coupon Thời gian kết thúc"
                                    name="coupon_end_date"
                                    rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' },
                                    () => ({
                                        validator(_, value) {
                                            const startDate = form.getFieldValue('coupon_start_date');
                                            if (!value || !startDate || value.isAfter(startDate)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Ngày kết thúc phải lớn hơn ngày bắt đầu!'));
                                        },
                                    }),
                                    ]}
                                >
                                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} lg={8}>
                                <Form.Item
                                    label="Coupon Giá trị đơn hàng tối thiểu"
                                    name="coupon_min_order_value"
                                >
                                    <InputNumber
                                        min={0}
                                        max={1000000}
                                        formatter={(value) => `${value} VNĐ`}
                                        parser={(value) => value.replace(' VNĐ', '')}
                                        placeholder="Nhập giá trị đơn hàng tối thiểu"
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} lg={8}>
                                <Form.Item
                                    label="Số lượng coupon"
                                    name="coupon_quantity"
                                    rules={[{ required: true, message: 'Vui lòng nhập số lượng coupon!' }]}
                                >
                                    <InputNumber
                                        min={1}
                                        max={10000}
                                        placeholder="Nhập số lượng coupon"
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Tạo Coupon
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )
            }

            <Table
                columns={columns}
                dataSource={coupons}
                rowKey="coupon_code"
                pagination={{ pageSize: 5 }}
                scroll={{ x: 'max-content' }}
            />
        </div >
    );
}

export default Coupon;
