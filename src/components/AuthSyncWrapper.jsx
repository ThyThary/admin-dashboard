// components/AuthSyncWrapper.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSyncWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        const user = JSON.parse(event.newValue);

        // If another tab logs out or clears the user
        if (!user) {
          navigate("/log-in");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return <>{children}</>; // Ensures valid React tree rendering
};

export default AuthSyncWrapper;
