import { Button } from "./ui/button";
import { logout } from "@/services/authService";

export function LogoutButton() {
    const handleLogout = async () => {
        try {
            await logout(); 
            window.location.href = "/login";
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <Button onClick={handleLogout}>Logout</Button>
    );
}