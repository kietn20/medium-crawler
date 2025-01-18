import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Login } from "./pages/Login";
import { useAuthStore } from "./store/authStore";
import { OAuthCallback } from "./components/OAuthCallback";

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="oauth2/callback" element={<OAuthCallback />} />
      </Routes>
    </Router>
  );
}
