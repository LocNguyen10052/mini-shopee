import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
import './loginManagager.style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStartAdmin } from '../../../store/user-store/user-action';
import { selectCurrentUser, selectLoadedUser } from '../../../store/user-store/user-seletor';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../Spinner/spinner.component';

const defaultFormFielts = {
    username: '',
    password: ''
}
function LoginMangager() {
    const [userForm, setUserForm] = useState(defaultFormFielts);
    const { username, password } = userForm;
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isLoaduser = useSelector(selectLoadedUser);
    const navigate = useNavigate();

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const resetFormFields = () => {
        setUserForm(defaultFormFielts);
    };

    const handleChangeValue = (event) => {
        const { name, value } = event.target;
        setUserForm({ ...userForm, [name]: value })
    };

    const handleSubmit = async () => {
        dispatch(emailSignInStartAdmin(username, password))
        resetFormFields();
    };
    if (!currentUser) {
        return <Spinner></Spinner>;
    }
    if (currentUser.role === 'admin') {
        navigate("/admin/home");
    }
    return (
        <div className='loginManager-container' >
            <h2>Đăng nhập</h2>
            <Form
                name="basic"
                labelCol={{
                    span: 6
                }}
                wrapperCol={{
                    span: 18,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelAlign="left"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!', },]}
                >
                    <Input
                        onChange={handleChangeValue}
                        name="username"
                        value={username}
                        prefix={<UserOutlined />}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!', },]}
                >
                    <Input.Password
                        onChange={handleChangeValue}
                        name="password"
                        value={password}
                        prefix={<LockOutlined />}
                    />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" >
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
}

export default LoginMangager;