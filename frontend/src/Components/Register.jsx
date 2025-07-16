import React, { useState } from "react";
import "./Register.css";
import { registerUser } from "../Services/api";

const Register = ({ onClose, onLoginClick }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      return setError("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await registerUser({
        name,
        email,
        password,
        confirmPassword,

      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/board";
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    }
  };
  return (
    <div className="register-overlay">
      <div className="register-card">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="register-title">Register</h2>

        {error && <div style={{ color: 'red', marginBottom: '8px' }}>{error}</div>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="register-btn" onClick={handleSubmit}>Register</button>

        <p className="switch-text">
          Already have an account?{' '}
          <a
            onClick={(e) => {
              e.preventDefault()
              onClose()
              onLoginClick(true)
            }}
            className="switch-link"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register;
