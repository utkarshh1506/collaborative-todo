import React, { useState } from "react";
import "./Login.css";
import { loginUser } from "../Services/api";

const Login = ({ onClose, onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return setError("Please enter both email and password");
    }

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/board"; // Redirect to dashboard
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Login</h2>

        {error && (
          <div style={{ color: "red", marginBottom: "8px" }}>{error}</div>
        )}

        <div className="inputs">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="links">
          <p>Don't have an account?</p>
          <a
            href="*"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              onRegisterClick(true);
            }}
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
