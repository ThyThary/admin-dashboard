import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token || token === "undefined") {
      // Optional: You can log this for debugging
      console.warn("No valid access token found. Redirecting to login.");

      // Clear potentially corrupted token
      localStorage.removeItem("access");

      // Redirect to login page
      navigate("/log-in", { replace: true });
    }
  }, [navigate]);

  // You might also want to conditionally render to avoid flash of protected content
  const token = localStorage.getItem("access");
  if (!token || token === "undefined") return null;

  return children;
};

export default ProtectedRoute;
