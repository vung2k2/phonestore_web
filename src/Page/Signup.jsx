import React, { useState } from "react";
import axios from "axios"; // Import thư viện Axios
import "./CSS/Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:1406/auth/register", {
        name,
        email,
        password,
      });

      // Đăng ký thành công
      console.log("Đăng ký thành công:", response.data);
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error(
        "Lỗi đăng ký:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <div className="signup-form">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
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
        <button onClick={handleSignUp}>Đăng ký</button>
      </div>
    </div>
  );
};

export default Signup;
