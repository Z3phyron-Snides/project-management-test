// src/pages/SignupPage.tsx
import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { signup } from "../features/authSlice";
import "../styles/login.scss";

const { Title } = Typography;

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    // If no token is found, redirect to login page
    return <Navigate to="/" />;
  }

  const onFinish = async () => {
    try {
      await dispatch(signup({ email, password, name })).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <Title level={2} className="title">Sign Up</Title>
        <Form name="signup_form" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              size="large"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              size="large"
              type="email"
              value={email}
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
            <Button type="primary" htmlType="submit" size="large" block>
              Sign Up
            </Button>
          </Form.Item>
          <Form.Item>
            Or <Link to="/login">login now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
