// src/components/LogoutButton.tsx
import { Button } from "./ui/button";
import { logout } from "@/services/authService"; // Import the logout function

export function LogoutButton() {
    const handleLogout = async () => {
        try {
            await logout(); // Call the logout function
            window.location.href = "/login"; // Redirect to the login page
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <Button onClick={handleLogout}>Logout</Button>
    );
}