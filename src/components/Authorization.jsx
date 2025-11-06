// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser, resetPassword } from "../features/userSlice";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import "./styles/Authorization.css";

export default function Authorization() {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.user);

  // Sign-up form
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Login form
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword)
      return alert("Passwords do not match");
    const name = `${signupForm.firstName} ${signupForm.lastName}`;
    dispatch(signupUser({ name, email: signupForm.email, password: signupForm.password }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: loginForm.email, password: loginForm.password }));
  };

  const handleForgotPassword = () => {
    if (!loginForm.email) return alert("Enter your email first");
    dispatch(resetPassword(loginForm.email));
  };

  return (
    <div className="auth-wrapper">
      <Row className="auth-container">
        {/* Left Side — Signup */}
        <Col md={6} className="auth-box">
          <h4 className="section-title">NEW CUSTOMER</h4>
          <p className="section-subtext">
            By creating an account, you’ll be able to shop faster, stay updated
            on orders, and track your previous purchases.
          </p>

          <Form onSubmit={handleSignup}>
            <h6>Your Personal Details:</h6>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={signupForm.firstName}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, firstName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={signupForm.lastName}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, lastName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
              />
            </Form.Group>

            <h6 className="mt-4">Your Password:</h6>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={signupForm.confirmPassword}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, confirmPassword: e.target.value })
                }
              />
            </Form.Group>

            <Button
              type="submit"
              className="mt-4 btn-auth"
              disabled={loading}
            >
              {loading ? "Creating..." : "Sign up"}
            </Button>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        </Col>

        {/* Right Side — Login */}
        <Col md={6} className="auth-box">
          <h4 className="section-title">RETURNING CUSTOMER</h4>
          <p className="section-subtext">
            If you already have an account, please log in below.
          </p>

          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                required
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />
            </Form.Group>

            <Button
              type="submit"
              className="mt-4 btn-auth"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="mt-3 d-flex justify-content-between">
              <Button
                variant="link"
                className="forgot-link p-0"
                onClick={handleForgotPassword}
              >
                Forgotten Password
              </Button>
              {message && <small className="text-success">{message}</small>}
            </div>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Form>
        </Col>
      </Row>
    </div>
  );
}
