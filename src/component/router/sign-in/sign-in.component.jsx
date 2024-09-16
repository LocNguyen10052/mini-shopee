import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './sign-in.style.scss'
import Header from '../../Banner/HeaderSign';
import { Col, Container, Row } from 'react-bootstrap';

import { UserContext } from '../../context/user.context';
import { signInAuthUserWithEmailAndPassword } from '../../../utils/firebase.utils';

const userDefaultForm = {
    email: '',
    password: ''
}
function SignIn(props) {
    const [userForm, setUserForm] = useState(userDefaultForm)
    const { email, password } = userForm
    const { setCurrentUser } = useContext(UserContext)
    const resetFormFields = () => {
        setUserForm(userDefaultForm);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            setCurrentUser(user)
            resetFormFields();
            alert('Login thanh cong');

        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-credential':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserForm({ ...userForm, [name]: value })
    }
    return (
        <div>
            {console.log("hit")}
            <Header props={{ name: "Đăng nhập" }}></Header>
            <div className="login-container">
                <Container className="justify-content-center flex-column d-flex ">
                    <Row >
                        <Col>
                        </Col>
                        <Col sm={4}>
                            <form className="login-form" onSubmit={handleSubmit}>
                                <h2>Đăng nhập</h2>
                                <div className="qr-login">
                                    <p>Đăng nhập với mã QR</p>
                                </div>
                                <input className='input-signin' type="text" placeholder="Email/Số điện thoại/Tên đăng nhập" name='email' value={email} onChange={handleChange} />
                                <input className='input-signin' type="password" placeholder="Mật khẩu" name='password' value={password} onChange={handleChange} />

                                <button className="login-button">ĐĂNG NHẬP</button>
                                <div className="login-links">
                                    <a href="/">Quên mật khẩu</a>
                                    <a href="/">Đăng nhập với SMS</a>
                                </div>
                                <div className="login-social">
                                    <p>HOẶC</p>
                                    <button className="social-button facebook">Facebook</button>
                                    <button className="social-button google">Google</button>
                                </div>
                                <p>Bạn mới biết đến Shopee? <a href="/">Đăng ký</a></p>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    );
}

export default SignIn;