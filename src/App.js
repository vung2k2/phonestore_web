import "./App.css";
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Signup from "./Page/Signup";
import Cart from "./Page/Cart";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
