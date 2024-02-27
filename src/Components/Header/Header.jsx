// import React, { useState } from "react";
// import "./Header.css";
// import logo from "../../Assets/img/logo.png";
// import cart_icon from "../../Assets/img/cart_icon.png";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [showLoginOptions, setShowLoginOptions] = useState(false);

//   const toggleLoginOptions = () => {
//     setShowLoginOptions(!showLoginOptions);
//   };
//   return (
//     <div className="header">
//       <div className="header-logo">
//         <img src={logo} alt="" />
//         <p>Phonestore</p>
//       </div>
//       <div className="search-box">
//         <input type="search" name="search-w" placeholder="Bạn cần tìm gi?" />
//         <button type="submit">Tìm kiếm</button>
//       </div>
//       <ul className="header-menu">
//         <li>
//           <Link style={{ textDecoration: "none", color: "white" }} to="/">
//             Trang chủ
//           </Link>
//         </li>
//         <li>
//           <Link
//             style={{ textDecoration: "none", color: "white" }}
//             to="/products"
//           >
//             Sản Phẩm
//           </Link>
//         </li>
//         <li className="account">
//           <span
//             style={{
//               textDecoration: "none",
//               color: "white",
//             }}
//             onClick={toggleLoginOptions}
//           >
//             Tài Khoản
//           </span>
//           {showLoginOptions && (
//             <ul className="login-options">
//               <li>
//                 <Link
//                   style={{
//                     textDecoration: "none",
//                     color: "white",
//                   }}
//                   to="/login"
//                 >
//                   Đăng nhập
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   style={{
//                     textDecoration: "none",
//                     color: "white",
//                   }}
//                   to="/register"
//                 >
//                   Đăng ký
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>
//         <li>
//           <Link style={{ textDecoration: "none", color: "white" }} to="/cart">
//             <img src={cart_icon} alt="" />
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Header;
import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo from "../../Assets/img/logo.png";
import cart_icon from "../../Assets/img/cart_icon.png";

const Header = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const toggleLoginOptions = () => {
    setShowLoginOptions(!showLoginOptions);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Phonestore Logo"
        />{" "}
        Phonestore
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Trang chủ</Nav.Link>
          <Nav.Link href="/products">Sản phẩm</Nav.Link>
          <NavDropdown
            title="Tài Khoản"
            id="basic-nav-dropdown"
            onClick={toggleLoginOptions}
          >
            <NavDropdown.Item href="/login">Đăng nhập</NavDropdown.Item>
            <NavDropdown.Item href="/signup">Đăng ký</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/cart">
            <img
              src={cart_icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Cart Icon"
            />
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Bạn cần tìm gì?"
            className="mr-sm-2"
          />
          <Button variant="outline-success">Tìm kiếm</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
