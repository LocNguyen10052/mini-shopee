import React from 'react';
import PropTypes from 'prop-types';
import './footer.style.scss'


function Footer(props) {
    return (
        <footer className="footer-container">
            <div className="footer-top">
                <div className="footer-column">
                    <h3>CHĂM SÓC KHÁCH HÀNG</h3>
                    <ul>
                        <li>Trung Tâm Trợ Giúp</li>
                        <li>Shopee Blog</li>
                        <li>Shopee Mall</li>
                        <li>Hướng Dẫn Mua Hàng</li>
                        <li>Hướng Dẫn Bán Hàng</li>
                        <li>Thanh Toán</li>
                        <li>Shopee Xu</li>
                        <li>Vận Chuyển</li>
                        <li>Trả Hàng & Hoàn Tiền</li>
                        <li>Liên Hệ Shopee</li>
                        <li>Chính Sách Bảo Hành</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>VỀ SHOPEE</h3>
                    <ul>
                        <li>Giới Thiệu Về Shopee Việt Nam</li>
                        <li>Tuyển Dụng</li>
                        <li>Điều Khoản Shopee</li>
                        <li>Chính Sách Bảo Mật</li>
                        <li>Chính Hãng</li>
                        <li>Kênh Người Bán</li>
                        <li>Flash Sales</li>
                        <li>Chương Trình Tiếp Thị Liên Kết Shopee</li>
                        <li>Liên Hệ Với Truyền Thông</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>THANH TOÁN</h3>
                    <div className="payment-methods">
                        <img src="visa.png" alt="Visa" />
                        <img src="mastercard.png" alt="MasterCard" />
                        {/* Thêm các icon khác tương tự */}
                    </div>
                    <h3>ĐƠN VỊ VẬN CHUYỂN</h3>
                    <div className="shipping-methods">
                        <img src="viettel.png" alt="Viettel" />
                        <img src="vnpost.png" alt="VNPost" />
                        {/* Thêm các icon khác tương tự */}
                    </div>
                </div>
                <div className="footer-column">
                    <h3>THEO DÕI CHÚNG TÔI TRÊN</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>LinkedIn</li>
                    </ul>
                    <h3>TẢI ỨNG DỤNG SHOPEE NGAY THÔI</h3>
                    <div className="app-download">
                        <img src="appstore.png" alt="App Store" />
                        <img src="googleplay.png" alt="Google Play" />
                        {/* Thêm các icon khác tương tự */}
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Shopee. Tất cả các quyền được bảo lưu.</p>
                <div className="footer-links">
                    <a href="/">CHÍNH SÁCH BẢO MẬT</a>
                    <a href="/">QUY CHẾ HOẠT ĐỘNG</a>
                    <a href="/">CHÍNH SÁCH VẬN CHUYỂN</a>
                    <a href="/">CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</a>
                </div>
                <p>Công ty TNHH Shopee</p>
            </div>
        </footer>
    );
}

export default Footer;