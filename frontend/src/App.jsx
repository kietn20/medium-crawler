import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Login } from "./pages/Login";

export default function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="profile" element={<Profile />} /> */}
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}
