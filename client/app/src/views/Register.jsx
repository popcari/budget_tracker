import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "../style/Register.css";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (values) => {
        setLoading(true);
        setSuccess(false);

        const { email, name, city, password } = values;

        // API request logic here
        try {
            const response = await fetch("http://localhost:8889/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, name, city, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                alert("Đăng ký thành công!");
                console.log(data);
            } else {
                // Show error if API call fails
                alert(data.message || "Đã xảy ra lỗi.");
            }
        } catch (err) {
            alert("Không thể kết nối đến máy chủ.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Đăng ký tài khoản</h2>
            <Form
                name="register"
                layout="vertical"
                onFinish={handleRegister}
                onFinishFailed={() => { }}
                autoComplete="off"
                style={{
                    width: '100%',
                    maxWidth: 600,
                    background: "rgb(49,51,56)",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                }}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email của bạn!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                    ]}
                >
                    <Input placeholder="Nhập email của bạn" />
                </Form.Item>

                <Form.Item
                    label="Tên"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                >
                    <Input placeholder="Nhập tên của bạn" />
                </Form.Item>

                <Form.Item
                    label="Thành phố"
                    name="city"
                    rules={[{ required: true, message: 'Vui lòng nhập thành phố của bạn!' }]}
                >
                    <Input placeholder="Nhập thành phố của bạn" />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu của bạn!' },
                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự.' },
                    ]}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                <Form.Item
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu của bạn!' },
                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự.' },
                    ]}
                >
                    <Input.Password
                        placeholder="Xác nhận mật khẩu"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Nhớ tôi</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                    <button type="submit" className="gradient-button" disabled={loading}>
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                </Form.Item>
            </Form>

            {success && <div className="success-message">Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.</div>}
        </div>
    );
};

export default Register;
