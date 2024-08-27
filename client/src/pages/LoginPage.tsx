// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { login } from "../features/authSlice";
import "../styles/login.scss";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    // If no token is found, redirect to login page
    return <Navigate to="/" />;
  }

  const onFinish = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <Title level={2} className="title">
          Login
        </Title>
        <Form name="login_form" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              type="email"
              value={email}
              size="large"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            Or <Link to="/signup">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
