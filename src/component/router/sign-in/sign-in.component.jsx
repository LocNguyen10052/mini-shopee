import React, { useEffect, useState } from 'react';
import './sign-in.style.scss'
import Header from '../../Banner/HeaderSign';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../../store/user-store/user-action';
import { selectLoadedUser } from '../../../store/user-store/user-seletor';

const userDefaultForm = {
    email: '',
    password: ''
}
function SignIn() {
    const [userForm, setUserForm] = useState(userDefaultForm);
    const { email, password } = userForm;
    const dispatch = useDispatch();
    const isUserLoaded = useSelector(selectLoadedUser);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
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
    const handleSignInWithGoogle = async (event) => {
        event.preventDefault();
        try {
            dispatch(googleSignInStart());
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserForm({ ...userForm, [name]: value })
    }
    useEffect(() => {
        console.log(isUserLoaded)
        if (isUserLoaded) {
            window.location.href = '/';
        }
    }, [isUserLoaded])
    return (
        <div>
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
                                    <button className="social-button google" type='button' onClick={handleSignInWithGoogle}>Google</button>
                                </div>
                                <p>Bạn mới biết đến Shopee? <a href="/signUp">Đăng ký</a></p>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    );
}

export default SignIn;