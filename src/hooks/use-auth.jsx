// useAuth.js
import { useState, useEffect } from "react";
import { decodeJwt } from "jose";
import { AuthAPI } from "../api";
import { useToast } from "../context/sonner";

export function useAuth() {
  const toast = useToast();
  const [user, setUser] = useState(() => {
    // Initialize user from token on first load
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
      const decoded = decodeJwt(token);
      return {
        id: decoded?.id || null,
        username: decoded?.username || null,
        email: decoded?.email || null,
      };
    } catch (err) {
      console.error("Failed to decode token:", err);
      return null;
    }
  });

  // Reactively update user if token changes
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return setUser(null);

      try {
        const decoded = decodeJwt(token);
        setUser({
          id: decoded?.id || null,
          username: decoded?.username || null,
          email: decoded?.email || null,
        });
      } catch {
        setUser(null);
      }
    };

    // Listen to storage changes (e.g., login/logout in other tabs)
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isLoggedIn = !!user;

  const logout = async () => {
    localStorage.removeItem("accessToken");
    try {
      const response = await AuthAPI.logout();
      if (response.data.statusCode === 200) {
        return toast.success(response.data.message, {
          closeButton: false,
          onAutoClose: () => {
            window.location.href = "/login";
          },
          duration : 1200
        });
      }
    } catch (e) {
        return toast.success("something went wrong while loggin you out");
    }
    setUser(null);
  };

  return { user, isLoggedIn, logout, setUser };
}
