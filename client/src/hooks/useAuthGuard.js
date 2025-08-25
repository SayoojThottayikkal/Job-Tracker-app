import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthGuard(token) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/auth", { replace: true });
  }, [token, navigate]);
}
