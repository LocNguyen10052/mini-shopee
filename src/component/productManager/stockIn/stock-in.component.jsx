import React from "react";
import { Table, Typography, Button, Tag, notification } from "antd";
import { useSelector } from "react-redux";
import { selectorStockIn } from "../../../store/stock-in-store/stock-in-selector";
import { createProduct } from "../../../utils/firebase.createproduct";

const { Text } = Typography;

function StockIn() {
    const stockIn = useSelector(selectorStockIn);

    // Hàm nhập sản phẩm vào kho
    const importProduct = async (product) => {
        try {
            // Gọi hàm createProduct để nhập sản phẩm
            await createProduct(product);
            // Hiển thị thông báo thành công
            notification.success({
                message: "Nhập kho thành công!",
                description: `Sản phẩm ${product.productName} đã được nhập kho.`,
            });
        } catch (error) {
            // Hiển thị thông báo lỗi
            notification.error({
                message: "Lỗi khi nhập kho",
                description: `Không thể nhập sản phẩm ${product.productName}. Vui lòng thử lại.`,
            });
        }
    };

    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "productTitle",
            key: "productTitle",
            render: (title) => (
                <Text ellipsis style={{ maxWidth: 200, display: "block" }}>
                    {title}
                </Text>
            ),
        },
        {
            title: "Giá (VNĐ)",
            dataIndex: "productPrice",
            key: "productPrice",
            render: (price) => (
                <Text strong style={{ color: "#ff4d4f" }}>
                    {Number(price).toLocaleString("vi-VN")}
                </Text>
            ),
        },
        {
            title: "Địa điểm",
            dataIndex: "productLocation",
            key: "productLocation",
        },
        {
            title: "Đã bán",
            dataIndex: "productSoldCount",
            key: "productSoldCount",
            render: (soldCount) => <Text>{soldCount}</Text>,
        },
        {
            title: "Nhập khẩu",
            dataIndex: "imported",
            key: "imported",
            render: (imported) => (
                <Tag
                    color={imported ? "green" : "red"}
                    style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        borderRadius: "12px",
                        padding: "4px 12px",
                    }}
                >
                    {imported ? "Đã nhập" : "Chưa nhập"}
                </Tag>
            ),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Button
                    type="primary"
                    onClick={() => importProduct(record)} // Truyền đối tượng của dòng hiện tại
                >
                    Nhập kho
                </Button>
            ),
        },
    ];

    return (
        <Table
            dataSource={stockIn}
            columns={columns}
            rowKey="productID"
            bordered
            pagination={{ pageSize: 5 }}
        />
    );
}

export default StockIn;
