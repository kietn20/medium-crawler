import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Login } from "./pages/Login";
import { useAuthStore } from "./store/authStore";
import { OAuthCallback } from "./components/OAuthCallback";

export default function App() {
  const setSignedIn = useAuthStore((state) => state.setSignedIn);

  const handleSignIn = () => {
    setSignedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login onSignIn={handleSignIn} />} />
        <Route path="oauth2/callback" element={<OAuthCallback />} />
      </Routes>
    </Router>
  );
}
