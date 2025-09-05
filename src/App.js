import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./dure-logo.svg";
import "./App.css";
import Shop from "./Shop"; // Shop 컴포넌트 import
import Home from "./Home"; // Home import (Home.js)
import Login from "./Login"; // 
import Signup from "./Signup";
import Navbar from "./components/NavBar";
import OrderList from "./OrderList";
import { AuthProvider } from "./context/AuthContext";
import Mypage from "./Mypage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />

          {/* 라우트 정의 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>

          {/* Footer */}
          <footer className="footer">
          <p>DureFarm | Business License: 635-87-01234 | Address: Seoul, Korea</p>
          <p>Help Center: +82 10-932-9321</p>
            <div className="footer-links">
            <span>Terms of Use</span>
            <span>Privacy Policy</span>
            <span>Instagram</span>
            <span>Blog</span>
          </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>

  );
}

export default App;