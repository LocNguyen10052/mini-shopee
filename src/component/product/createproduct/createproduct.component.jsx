
import React, { useState } from 'react';
import './createproduct.style.scss'
import { createProduct } from '../../../utils/firebase.createproduct';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../store/category-store/category-selector';
import { selectCurrentUser } from '../../../store/user-store/user-seletor';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import city from './../../../asset/City.json';


const defaulProductFields = {
    productName: "",
    productTitle: "",
    productImage: "",
    productLocation: "",
    productSoldCount: "",
    productPrice: "",
    categoryID: null
}
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
function CreateProduct() {
    const currentUser = useSelector(selectCurrentUser);
    const [product, setProduct] = useState(defaulProductFields);
    const [fileList, setFileList] = useState('');
    const categoriesSelector = useSelector(selectCategories);
    const [form] = Form.useForm();

    const handleFileChange = ({ file: newFile }) => {
        setFileList(newFile); // Cập nhật danh sách file
    };

    const handleSubmit = async () => {
        try {
            await createProduct(product, fileList)
            form.resetFields();
            setFileList([]);


        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    }

    const handleSelectChange = (value, option) => {
        const name = option.props.name;
        setProduct({ ...product, [name]: value });
    };

    return (
        <>
            {console.log(fileList)}
            <Form
                form={form}
                labelCol={{
                    span: 12,
                }}
                wrapperCol={{
                    span: 12,
                }}
                style={{
                    maxWidth: 600,
                }}
                layout="horizontal"
                onFinish={handleSubmit}
                initialValues={defaulProductFields}
            >
                {/* Loại sản phẩm */}
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
                        onChange={(value) =>
                            handleSelectChange(value, { props: { name: "categoryID" } })
                        }
                    >
                        {categoriesSelector.map((item) => (
                            <Select.Option key={item.ID} value={item.ID}>
                                {item.categoryName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Tên sản phẩm */}
                <Form.Item
                    label="Tên Sản Phẩm"
                    name="productName"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên sản phẩm!",
                        },
                    ]}
                >
                    <Input
                        placeholder="Nhập tên sản phẩm"
                        onChange={handleInputChange}
                        name="productName"
                    />
                </Form.Item>

                {/* Mô tả sản phẩm */}
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
                        onChange={handleInputChange}
                        showCount
                        maxLength={100}
                        style={{
                            height: 120,
                            resize: "none",
                        }}
                    />
                </Form.Item>

                {/* Upload */}
                <Form.Item
                    label="Upload"
                    name="upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng tải lên hình ảnh!",
                        },
                    ]}
                >
                    <Upload
                        listType="picture-card"
                        fileList={fileList} // Kết nối trạng thái fileList
                        onChange={handleFileChange} // Cập nhật trạng thái
                        beforeUpload={() => false} // Không tự động upload
                    >
                        <button
                            style={{
                                border: 0,
                                background: "none",
                            }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>


                {/* Số lượng sản phẩm */}
                <Form.Item
                    label="Số lượng sản phẩm"
                    name="productSoldCount"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số lượng sản phẩm!",
                        },
                    ]}
                >
                    <Input
                        type="number"
                        placeholder="Nhập số lượng sản phẩm"
                        onChange={handleInputChange}
                        name="productSoldCount"
                    />
                </Form.Item>

                {/* Giá tiền */}
                <Form.Item
                    label="Giá tiền"
                    name="productPrice"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập giá tiền!",
                        },
                    ]}
                >
                    <InputNumber
                        prefix="VND"
                        addonAfter={<SettingOutlined />}
                        placeholder="Nhập giá tiền"
                        style={{
                            width: "100%",
                        }}
                        onChange={(value) =>
                            handleSelectChange(value, { props: { name: "productPrice" } })
                        }
                        name="productPrice"
                    />
                </Form.Item>

                {/* Địa chỉ */}
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
                        onChange={(value) =>
                            handleSelectChange(value, { props: { name: "productLocation" } })
                        }
                        name="productLocation"
                    />
                </Form.Item>

                {/* Nút Submit */}
                <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
                    <Button type="primary" htmlType="submit">
                        Tạo sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </>

    );
}

export default CreateProduct;