import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthAPI } from "../api";
import LoadingScreen from "../components/custom/loading-screen";

export default function Middleware({ children }) {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setValid(false);
        setLoading(false);
        return;
      }

      try {
        const response = await AuthAPI.verify();
        setValid(response.data.valid);
      } catch (e) {
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) return <LoadingScreen content={"verifying you"} />; // optional loader

  if (!valid) return <Navigate to="/login" replace />;

  return children;
}
