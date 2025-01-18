// import { useEffect } from "react";
// import { useAuthStore } from "../store/authStore";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const OAuthCallback = () => {
//   const setUser = useAuthStore((state) => state.setUser);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("/api/auth/me");

//         const { name, watchLists } = response.data;

//         // Prepare watchLists for local storage
//         const currentMediaList = watchLists.length > 0
//           ? watchLists[0]
//           : { name: "New List", items: [] };

//         // Update local storage
//         localStorage.setItem("currentMediaList", JSON.stringify(currentMediaList));
//         localStorage.setItem("mediaLists", JSON.stringify(watchLists));

//         setUser(response.data);
//         console.log("User authenticated:", response.data);
//         navigate("/");
//       } catch (error) {
//         console.error("Error fetching authenticated user:", error.response?.data || error.message);
//         navigate("/login");
//       }
//     };

//     fetchUser();
//   }, [setUser, navigate]);

//   return <div>Loading...</div>;
// };

// import { useEffect } from "react";
// import { useAuthStore } from "../store/authStore";
// import { useMediaStore } from "../store/mediaStore"; // Import media store
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const OAuthCallback = () => {
//   const setUser = useAuthStore((state) => state.setUser);
//   const setToken = useAuthStore((state) => state.setToken);
//   const clearLocalStorage = useMediaStore((state) => state.clearLocalStorage);
//   const setMediaLists = useMediaStore((state) => state.setMediaLists);
//   const setCurrentMediaList = useMediaStore((state) => state.setCurrentMediaList);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("/api/auth/me", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         const { token, user } = response.data;

//         // Save token and user data
//         setToken(token);
//         setUser(user);

//         navigate("/");
//       } catch (error) {
//         console.error("Error fetching user:", error.response?.data || error.message);
//         navigate("/login");
//       }
//     };

//     fetchUser();
//   }, [setToken, setUser, navigate]);

//   return <div>Loading...</div>;
// };

import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useMediaStore } from "../store/mediaStore"; // Import media store
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const OAuthCallback = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const clearLocalStorage = useMediaStore((state) => state.clearLocalStorage);
  const setMediaLists = useMediaStore((state) => state.setMediaLists);
  const setCurrentMediaList = useMediaStore((state) => state.setCurrentMediaList);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const { token, user } = response.data;

        // Save token and user data
        setToken(token);
        setUser(user);

        // Clear and set media lists
        clearLocalStorage();
        setMediaLists(user.watchLists);
        setCurrentMediaList(user.watchLists[0]);

        navigate("/");
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        navigate("/login");
      }
    };

    fetchUser();
  }, [setToken, setUser, clearLocalStorage, setMediaLists, setCurrentMediaList, navigate]);

  return <div>Loading...</div>;
};