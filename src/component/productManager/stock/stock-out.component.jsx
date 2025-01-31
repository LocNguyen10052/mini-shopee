import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectorStockOut } from '../../../store/stock-out-store/stock-out-selector';
import { Button, Table } from 'antd';
import { CheckOutlined, ExportOutlined } from '@ant-design/icons';
import StockOutDetailModal from './modal-stock-out.component';
import { selectorCartAdmin } from '../../../store/cart-admin-store/cart-admin-selector';
import { mergeStock } from '../../../utils/firebase.stock';


function StockOut() {
    const stockOuts = useSelector(selectorStockOut);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStockOut, setSelectedStockOut] = useState(null);
    const carts = useSelector(selectorCartAdmin);
    const [stockoutData, setStockoutData] = useState();

    const showModal = (record) => {
        setSelectedStockOut(record)
        setIsModalOpen(!isModalOpen);
    }

    const columns = [
        {
            title: 'Mã phiếu',
            dataIndex: 'stockOutID',
            key: 'stockOutID',
        },
        {
            title: 'Ngày',
            dataIndex: 'createAt',
            key: 'createAt',
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
            title: 'Trạng thái',
            dataIndex: 'isExported',
            key: 'isExported',
            render: (_, record) => (
                record.isExported ? (
                    <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        style={{
                            backgroundColor: "#52c41a",
                            borderColor: "#52c41a",
                            color: "white",
                            borderRadius: "6px", // Bo góc cho nút
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Tạo hiệu ứng nổi
                        }}
                        onClick={() => showModal(record)}
                    >
                        Kiểm tra
                    </Button>
                ) : (
                    <Button
                        type="default"
                        icon={<ExportOutlined />}
                        style={{
                            color: "#1890ff",
                            borderColor: "#1890ff",
                            borderRadius: "6px", // Bo góc cho nút
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Tạo hiệu ứng nổi
                        }}
                        onClick={() => showModal(record)}
                    >
                        Xuất kho
                    </Button>
                )
            ),
        }

    ];
    const mergeStockOut = () => {
        const stockoutUpdate = mergeStock(stockOuts, carts)
        setStockoutData(stockoutUpdate);
    }
    useEffect(() => {
        mergeStockOut();
    }, [stockOuts, carts])
    return (
        <div>
            <Table columns={columns} dataSource={stockoutData} rowKey="stockOutID" />
            {selectedStockOut && (
                <StockOutDetailModal
                    visible={isModalOpen}
                    onClose={showModal}
                    data={selectedStockOut}
                    showModal={showModal}
                />
            )}

        </div>
    );
}

export default StockOut;
