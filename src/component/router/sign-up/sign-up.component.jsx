import React, { useContext, useState } from 'react';
import './sign-up.style.scss';
import Header from '../../Banner/HeaderSign';
import { Col, Container, Placeholder, Row } from 'react-bootstrap';
import { createAuthUserWithEmailAndPassword, createCategory, createUser, signInAuthUserWithEmailAndPassword, signInWithGoogleAccountPopUp } from '../../../utils/firebase.utils';
import { UserContext } from '../../context/user.context';
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};
const SignUp = () => {
    const [userFields, setUserFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = userFields;
    const { setUserContext } = useContext(UserContext)
    const signInWithPopUp = async () => {
        const { user } = await signInWithGoogleAccountPopUp()
        const userCreate = await createUser(user)
    }
    const signInWithEmailPasssword = async () => {
        const { user } = await signInAuthUserWithEmailAndPassword()
        const userCreate = await createUser(user)
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserFields({ ...userFields, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password != confirmPassword) {
            alert("Mật khẩu không khớp");
        }
        else {
            try {
                const { user } = await createAuthUserWithEmailAndPassword(email, password);
                const useCreate = await createUser(user)
                setUserFields(defaultFormFields)
                alert("Đăng Ký Thành Công")
                setUserContext(useCreate)
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    alert("Email đã tồn tại")
                }
            }
        }
    }
    return (
        <div>
            <Header props={{ name: "Đăng Ký" }}></Header>
            <div className="login-container">
                <Container className="justify-content-center flex-column d-flex ">
                    <Row >
                        <Col>
                        </Col>
                        <Col sm={4}>
                            <form className="login-form" onSubmit={handleSubmit}>
                                <h2>Đăng Ký</h2>
                                <input className='input-signup' type="text" placeholder='Tên hiển thị' name='displayName' value={displayName} onChange={handleChange} ></input>
                                <input className='input-signup' type="Email" placeholder='Email' name='email' value={email} onChange={handleChange}></input>
                                <input className='input-signup' type="password" placeholder='Mật khẩu' name='password' value={password} onChange={handleChange}></input>
                                <input className='input-signup' type="password" placeholder='Xác nhận mật khẩu' name='confirmPassword' value={confirmPassword} onChange={handleChange} ></input>
                                <button className="login-button">Đăng Ký</button>
                                <div className="login-social">
                                    <p>HOẶC</p>
                                    <button className="social-button facebook">Facebook</button>
                                    <button className="social-button google" onClick={signInWithPopUp}>Google</button>
                                </div>
                                <p>Bạn đã có tài khoản? <a href="/">Đăng Ký</a></p>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div >
    );
};

export default SignUp;
