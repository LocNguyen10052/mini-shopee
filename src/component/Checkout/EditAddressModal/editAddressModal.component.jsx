import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Cascader } from 'antd';



function EditAddressModal({ isVisible, onCancel, onSubmit, initialValues }) {
    const [form] = Form.useForm();
    const [cityData, setCityData] = useState();
    const handleSubmit = (values) => {
        console.log('Form values:', values);
        onSubmit(values);
    };
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Data fetched from API:', data); // Kiểm tra dữ liệu trả về
                const formattedData = data.map((province) => ({
                    ...province,
                    value: province.Name,
                    label: province.Name,
                    children: province.Districts.map((district) => ({
                        ...district,
                        value: district.Name,
                        label: district.Name,
                        children: district.Wards.map((ward) => ({
                            ...ward,
                            value: ward.Name,
                            label: ward.Name,
                        })),
                    })),
                }));
                setCityData(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching city data:', error);
            });
    }, []);




    return (
        <Modal
            title="Edit Address"
            open={isVisible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                name="addressForm"
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={initialValues}
                style={{ maxWidth: 600, margin: '0 auto' }}
            >
                {/* Họ và tên */}
                <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập họ và tên!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập họ và tên" />
                </Form.Item>

                {/* Số điện thoại */}
                <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại!',
                        },
                        {
                            pattern: /^[0-9]{10,11}$/,
                            message: 'Số điện thoại không hợp lệ!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                {/* Địa chỉ (Cascader) */}
                <Form.Item
                    name="ditrict"
                    label="Thành phố"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn thành phố!',
                        },
                    ]}
                >
                    <Cascader
                        options={cityData}
                        placeholder="Chọn thành phố, quận/huyện, phường/xã"
                        showSearch
                    />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập địa chỉ!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
                {/* Nút gửi */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditAddressModal;
