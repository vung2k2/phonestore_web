import React, { useState } from "react";
import axios from "axios";
import "./CSS/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:1406/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Đăng nhập thành công:", response.data);

        window.location.href = "/";
      }
    } catch (error) {
      console.error(
        "Lỗi đăng nhập:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-form">
          <input
            type="text"
            placeholder="Your email"
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
        <button onClick={handleLogin}>Đăng nhập</button>
      </div>
    </div>
  );
};

export default Login;
