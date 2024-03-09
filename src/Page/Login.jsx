import React, { useState } from "react";
import axios from "axios";
import "./CSS/Login.css";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      setErrorMessage("Vui lòng kiểm tra chính xác thông tin đăng nhập.");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Đăng nhập</h1>
        <div className="login-form">
          <input
            type="text"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            style={{
              position: "absolute",
              top: "44%",
              right: "80px",

              cursor: "pointer",
            }}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <RiEyeLine size={30} color="#808080" />
            ) : (
              <RiEyeCloseLine size={30} color="#808080" />
            )}
          </span>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleLogin}>Đăng nhập</button>
      </div>
    </div>
  );
};

export default Login;
