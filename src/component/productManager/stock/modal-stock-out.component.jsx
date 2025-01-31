import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { exportStockOut } from '../../../utils/firebase.stock';
import { selectorProduct } from '../../../store/product-store/product-selector';
import { useSelector } from 'react-redux';
import { getNotificationUser } from '../../../utils/firebase.notification';

function StockOutDetailModal({ visible, onClose, data, showModal }) {
    const products = useSelector(selectorProduct);
    const [showNotifyButton, setShowNotifyButton] = useState(false);
    const [productFail, setProductFail] = useState([]); // Quản lý danh sách sản phẩm hết hàng

    const handleExportClick = () => {
        exportStockOut(data);
        showModal();
    };

    const handleClickNotification = async () => {
        getNotificationUser(data.email, "Sản phẩm này đã hết hàng", productFail);
    };

    // Tính toán danh sách sản phẩm hết hàng khi dữ liệu thay đổi
    useEffect(() => {
        if (Array.isArray(data.carts) && data.carts.length > 0) {
            const outOfStockProducts = data.carts.filter(productOut => {
                const matchingProduct = products.find(product => product.productID === productOut.productID);
                return matchingProduct && matchingProduct.productSoldCount < productOut.quality;
            });
            setProductFail(outOfStockProducts);
            setShowNotifyButton(outOfStockProducts.length > 0);
        } else {
            setProductFail([]);
            setShowNotifyButton(false);
        }
    }, [products, data.carts]);

    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'productID',
            key: 'productID',
        },
        {
            title: 'Số lượng xuất',
            dataIndex: 'quality',
            key: 'quality',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (text, record) => {
                const matchingProduct = products.find(product => product.productID === record.productID);

                if (!matchingProduct) {
                    return <Tag color="red">Không tìm thấy</Tag>;
                }

                if (matchingProduct.productSoldCount >= record.quality) {
                    return <Tag color="green">Còn hàng</Tag>;
                }

                // Thay vì gọi setProductFail trong render, chỉ render ra UI
                else {
                    setProductFail(matchingProduct);
                    return (
                        <Tag color="red">Hết hàng</Tag>
                    );
                }
            }
        },
    ];

    return (
        <Modal
            title="Chi tiết phiếu xuất kho"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <p>
                <strong>Mã phiếu:</strong> {data.stockOutID}
            </p>
            <Table
                columns={columns}
                dataSource={data.carts}
                rowKey="productID"
                pagination={false}
                title={() => <strong>Danh sách sản phẩm</strong>}
            />
            <p>
                <strong>Trạng thái:</strong>{' '}
                {data.isExported ? (
                    <Tag color="green" style={{ fontWeight: 'bold' }}>
                        Đã xuất kho
                    </Tag>
                ) : (
                    showNotifyButton ? (
                        <Button
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            onClick={handleExportClick}
                            style={{
                                backgroundColor: '#333',
                                borderColor: '#333',
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                            disabled
                        >
                            Xuất kho
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            onClick={handleExportClick}
                            style={{
                                backgroundColor: '#ff4d4f',
                                borderColor: '#ff7875',
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                        >
                            Xuất kho
                        </Button>
                    )
                )}
            </p>
            {showNotifyButton && (
                <Button
                    type="dashed"
                    style={{
                        marginTop: '16px',
                        color: '#fa8c16',
                        borderColor: '#fa8c16',
                        fontWeight: 'bold',
                    }}
                    onClick={handleClickNotification}
                >
                    Thông báo với khách hàng
                </Button>
            )}
        </Modal>
    );
}

export default StockOutDetailModal;
