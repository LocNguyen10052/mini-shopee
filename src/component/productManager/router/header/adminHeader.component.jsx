import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './adminHeader.style.scss';

const items1 = [
    { id: 1, key: '/admin/home', label: 'Product', path: '/admin/home' },
    { id: 2, key: '/admin/createProduct', label: 'Tạo sản phẩm', path: '/admin/createProduct' },
    { id: 3, key: '/admin/order', label: 'Danh sách đơn hàng', path: '/admin/order' },
    { id: 4, key: '/admin/coupon', label: 'Danh sách mã khuyến mãi', path: '/admin/coupon' },
];

// Chuyển đổi items1 thành cấu trúc phù hợp cho `items` của Menu
const menuItems = items1.map((item) => ({
    key: item.key, // Dùng `key` cho định danh mục menu
    label: (
        <Link className="Link_Navbar_Admin" to={item.path}>
            {item.label}
        </Link>
    ),
    className: "MenuItem_Navbar_Admin",
}));

function AdminHeader() {
    const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại


    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname]} // Thay thế defaultSelectedKeys bằng selectedKeys
                style={{ flex: 1, minWidth: 0, color: 'white' }}
                items={menuItems} // Truyền menuItems vào đây
            />
        </Header>
    );
}

export default AdminHeader;
