import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Card, Typography, Row, Col, Affix, Popover } from 'antd';
import { DownOutlined, FlagFilled } from "@ant-design/icons";
import CartItemComponent from '../cartitem/cartItem.component';
import { selectCartDataFull, selectCartItemsTotal, selectProductID, selectCartProductData, selectCartItems } from '../../../store/cart-store/cart-selector';
import { setCartData } from '../../../store/cart-store/cart-action';
import { createOrder, mergaCartAndProductData } from '../../../utils/firebase.cart';
import './checkout.style.scss';
import EditAddressModal from '../EditAddressModal/editAddressModal.component';
import { activeCouponUsers } from '../../../utils/firebase.coupon';
import Bill from '../bill/bill.component';
import { selectCurrentUser } from '../../../store/user-store/user-seletor';

const { Text } = Typography;

function Checkout() {
    const cartsTotal = useSelector(selectCartItemsTotal);
    const cartsData = useSelector(selectCartDataFull);
    const carts = useSelector(selectCartItems);
    const productIDCartArray = useSelector(selectProductID);
    const productCartData = useSelector(selectCartProductData);
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi
    const [successMessage, setSuccessMessage] = useState(""); // Thông báo thành công
    const [coupon, setCoupon] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        houseNumber: "",
        city: "",
        ward: "",
    });
    const [bill, setBill] = useState({
        cartsTotal,
        shipCost: 100000,
        couponProductCost: 0,
        couponShipCost: 0,
        orderTotal: 0,
        couponID: "null",
    });

    const mergeCartProduct = () => {
        const cartsDatamerge = mergaCartAndProductData(carts, productCartData);
        dispatch(setCartData(cartsDatamerge));
    };

    const handleSubmitCart = async () => {
        if (!formData.fullName || !formData.phoneNumber || !formData.address || !formData.ditrict) {

            setErrorMessage("Vui lòng điền đầy đủ thông tin!");
            return;
        } try {
            await createOrder(formData, currentUser, carts, bill);
            setErrorMessage('')
            setCoupon('')
        } catch (error) {
            setErrorMessage(error.message || "Có lỗi xảy ra khi tạo đơn hàng.");
        }
    };

    const handleSubmitCoupon = async () => {
        try {
            const couponData = await activeCouponUsers(coupon, bill);
            setBill({
                ...couponData,
                orderTotal: couponData.cartsTotal + couponData.shipCost - couponData.couponProductCost - couponData.couponShipCost,
            });
            setSuccessMessage("Áp dụng mã giảm giá thành công!");
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.message || "Coupon không hợp lệ!");
            setSuccessMessage("");
            console.log(cartsTotal)
            setBill({
                ...bill,
                couponProductCost: 0,
                couponShipCost: 0,
                orderTotal: cartsTotal + bill.shipCost
            })
        }
    };

    const handleCouponInputChange = (event) => {
        const { value } = event.target;
        setErrorMessage("");
        setSuccessMessage("");
        setCoupon(value);
    };

    const handleSubmitFormInput = (values) => {
        setFormData(values);
        setIsCollapsed(false);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        mergeCartProduct();
    }, [productIDCartArray, productCartData, carts]);
    useEffect(() => {
        // setBill({ ...bill, cartsTotal, orderTotal: cartsTotal + bill.shipCost - bill.couponShipCost - bill.couponProductCost });
        if (bill.coupon_min_order_value > cartsTotal) {
            setErrorMessage("Đơn hàng không đủ điều kiện!");
            setSuccessMessage('')
            setBill({
                ...bill,
                couponProductCost: 0,
                couponShipCost: 0,
                orderTotal: cartsTotal + bill.shipCost,
                cartsTotal
            })
        } else {
            setBill({ ...bill, cartsTotal, orderTotal: cartsTotal + bill.shipCost - bill.couponShipCost - bill.couponProductCost });
        }
    }, [cartsTotal]);
    return (
        <div className='checkout-container'>
            <Form onFinish={handleSubmitCart}>
                <Card style={{ marginBottom: "10px" }} size="small">
                    {formData.fullName || "Chưa nhập"}
                    {formData.phoneNumber || "Chưa nhập"}
                    {" "}
                    {formData.address + "," || "Chưa nhập"}
                    {formData.ditrict && formData.ditrict.length > 0
                        ? formData.ditrict.join(", ")
                        : "Chưa chọn"}
                    <Button
                        type="link"
                        onClick={toggleCollapse}
                        icon={<DownOutlined />}
                        style={{ float: "right" }}
                    >
                        Sửa thông tin
                    </Button>
                </Card>
                <EditAddressModal
                    isVisible={isCollapsed}
                    onCancel={toggleCollapse}
                    onSubmit={handleSubmitFormInput}
                    initialValues={formData}
                />
                <div className='checkout-header' style={{ backgroundColor: 'white', marginBottom: '10px' }}>
                    <div className='header-block'><span>Product</span></div>
                    <div className='header-block'><span>Description</span></div>
                    <div className='header-block'><span>Quantity</span></div>
                    <div className='header-block'><span>Price</span></div>
                    <div className='header-block'><span>Remove</span></div>
                </div>
                <div className='checkout-listItem' style={{ backgroundColor: 'white' }}>
                    {
                        cartsData.map((cart) => {
                            if (!cart.ordered) {
                                return (<CartItemComponent key={cart.cartID} cart={cart} ordered={cart.ordered} />)
                            }
                        })
                    }
                </div>
                <Affix offsetBottom={0}>
                    <Card
                        style={{
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#fff',
                            padding: '10px 20px',
                            marginTop: '10px',
                        }}
                    >
                        <Row justify="space-between" align="middle" gutter={[8, 16]}>
                            <Col style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Input
                                    placeholder="Nhập mã giảm giá"
                                    style={{
                                        width: 200,
                                        borderColor: errorMessage ? 'red' : undefined,
                                    }}
                                    onChange={handleCouponInputChange}

                                />
                                <Button onClick={handleSubmitCoupon}>
                                    Áp dụng
                                </Button>
                                {errorMessage && (
                                    <Typography.Text type="danger" style={{ fontSize: '12px', marginTop: '4px' }}>
                                        {errorMessage}
                                    </Typography.Text>
                                )}
                                {successMessage && (
                                    <Typography.Text type="success" style={{ fontSize: '12px', marginTop: '4px' }}>
                                        {successMessage}
                                    </Typography.Text>
                                )}
                            </Col>
                            <Col style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <Popover placement="topLeft" content={<Bill data={bill} />}>
                                    <Typography.Text strong style={{ fontSize: '18px' }}>
                                        Tổng tiền: {bill.orderTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </Typography.Text>
                                </Popover>
                                <Button htmlType='submit' style={{ backgroundColor: '#F05D40', border: '0px', borderRadius: '0px', color: 'white' }}>
                                    Xác nhận
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Affix>

            </Form>
            <div className='checkout-listItem' style={{ backgroundColor: 'white' }}>
                {
                    cartsData.map((cart) => {
                        if (cart.ordered) {
                            return (<CartItemComponent key={cart.cartID} cart={cart} ordered={cart.ordered} />)
                        }
                    })
                }
            </div>
        </div>
    );
}

export default Checkout;
