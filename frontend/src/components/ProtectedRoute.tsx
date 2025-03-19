import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/workout-sessions/", {
                    credentials: "include",
                });

                if (!response.ok) {
                    navigate("/login");
                }
            } catch (err) {
                navigate("/login");
            }
        };

        checkAuth();
    }, [navigate]);

    return <>{children}</>;
};