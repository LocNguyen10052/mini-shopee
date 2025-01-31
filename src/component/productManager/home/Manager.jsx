import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectorProduct } from '../../../store/product-store/product-selector';
import { Table, Modal, Form, Input, Button, Select, Upload } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { editProduct, unSnapshotProduct } from '../../../utils/firebase.createproduct';
import { selectCategories } from '../../../store/category-store/category-selector';
import city from './../../../asset/City.json';


function Manager() {
    const products = useSelector(selectorProduct);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const categoriesSelector = useSelector(selectCategories);
    // Xử lý khi nhấn nút Save
    const handleSave = async (editingProduct) => {
        await editProduct(editingProduct);
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    // xử lý firebase edit product
    const handleEdit = (record) => {
        setEditingProduct(record);
        setIsModalOpen(true);
    };


    const columns = [
        {
            title: 'Mã ID',
            dataIndex: 'productID',
            key: 'productID',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },

        {
            title: 'Location',
            dataIndex: 'productLocation',
            key: 'productLocation',
        },
        {
            title: 'Price (VND)',
            dataIndex: 'productPrice',
            key: 'productPrice',
            render: (price) => `${price.toLocaleString()} VND`, // Hiển thị giá với định dạng tiền tệ
        },
        {
            title: 'Sold Count',
            dataIndex: 'productSoldCount',
            key: 'productSoldCount',
        },
        {
            title: 'Title',
            dataIndex: 'productTitle',
            key: 'productTitle',
        },
        {
            title: 'Product Image',
            dataIndex: 'productImage',
            key: 'productImage',
            render: (text) => (
                <img
                    src={text}
                    alt="Product"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(record)}
                >
                    Edit
                </Button>
            ),
        }
    ];
    useEffect(() => {
        return () => {
            unSnapshotProduct();
        }
    }, [])

    return (
        <>
            <Table dataSource={products} columns={columns} bordered />

            {/* Modal chỉnh sửa */}
            <Modal
                title="Edit Product"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                {editingProduct && (
                    <Form
                        key={editingProduct.productID} // Tạo key duy nhất dựa trên ID của sản phẩm
                        initialValues={editingProduct}
                        onFinish={handleSave}
                        layout="vertical"
                    >

                        {/* Input id */}
                        <Form.Item
                            label="ID sản phẩm"
                            name="productID"
                            rules={[{ required: true, message: 'Please enter the product name' }]}

                        >
                            <Input disabled />
                        </Form.Item>

                        {/* Input loại */}
                        <Form.Item
                            label="Loại sản phẩm"
                            name="categoryID"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn loại sản phẩm!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Chọn loại sản phẩm"
                                style={{
                                    width: 220,
                                }}
                            >
                                {categoriesSelector.map((item) => (
                                    <Select.Option key={item.ID} value={item.ID}>
                                        {item.categoryName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        {/* Input tên */}
                        <Form.Item
                            label="Product Name"
                            name="productName"
                            rules={[{ required: true, message: 'Please enter the product name' }]}
                        >
                            <Input />
                        </Form.Item>

                        {/* Input giá */}
                        <Form.Item
                            label="Product Price"
                            name="productPrice"
                            rules={[{ required: true, message: 'Please enter the product price' }]}
                        >
                            <Input type="number" />
                        </Form.Item>


                        {/* Input Mô tả */}
                        <Form.Item
                            label="Mô tả sản phẩm"
                            name="productTitle"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mô tả sản phẩm!",
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Nhập mô tả sản phẩm"
                                name="productTitle"
                                showCount
                                maxLength={100}
                                style={{
                                    height: 120,
                                    resize: "none",
                                }}
                            />
                        </Form.Item>

                        {/* Input Ảnh */}
                        <Form.Item
                            label="Upload"
                            name="productImage"

                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng tải lên hình ảnh!",
                                },
                            ]}
                        >
                            <Upload
                                listType="picture-card"
                                beforeUpload={() => false} // Ngăn tự động upload
                                defaultFileList={
                                    editingProduct?.productImage
                                        ? [
                                            {
                                                uid: '-1',
                                                name: 'productImage.png',
                                                status: 'done',
                                                url: editingProduct.productImage, // URL ảnh từ API
                                            },
                                        ]
                                        : []
                                }
                            >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </Upload>
                        </Form.Item>

                        {/* Input số lượng */}
                        <Form.Item
                            label="Số lượng sản phẩm"
                            name="productSoldCount"
                            rules={[{ required: true, message: 'Please enter the product location' }]}
                        >
                            <Input />
                        </Form.Item>
                        {/* Input địa chỉ */}
                        <Form.Item
                            label="Địa chỉ"
                            name="productLocation"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn địa chỉ!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Chọn tỉnh thành"
                                style={{
                                    width: 220,
                                }}
                                options={city}

                                name="productLocation"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal >

        </>

    );
}

export default Manager;