import React, { useState } from "react";
import { Checkbox, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "../style/Login.css";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (values) => {
        setLoading(true);
        setError("");

        const { email, password } = values;

        if (!email || !password) {
            setError("Email và mật khẩu không được để trống.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:8889/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Đăng nhập thành công!");
                console.log(data);
            } else {
                setError(data.message || "Đã xảy ra lỗi.");
            }
        } catch (err) {
            setError("Không thể kết nối đến máy chủ.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            <Form
                name="login"
                layout="vertical"
                onFinish={handleLogin}
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
                    className="custom-label"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email của bạn!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                    ]}
                >
                    <Input placeholder="Nhập email của bạn" />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    className="custom-label"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu"
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

                {error && <div className="error-message">{error}</div>}

                <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                    <button type="submit" className="gradient-button" disabled={loading}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
