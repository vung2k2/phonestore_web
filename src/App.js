import "./App.css";
import Header from "./Components/Header/Header";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Signup from "./Page/Signup";
import Cart from "./Page/Cart";
import Product from "./Page/Product";
import ProductDetail from "./Page/ProductDetail";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ProductProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />{" "}
          </Routes>
        </ProductProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
