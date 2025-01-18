import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const OAuthCallback = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        setUser(response.data);
        console.log("User authenticated:", response.data);
        navigate("/");
      } catch (error) {
        console.error("Error fetching authenticated user:", error.response?.data || error.message);
        navigate("/login");
      }
    };

    fetchUser();
  }, [setUser, navigate]);

  return <div>Loading...</div>;
};
