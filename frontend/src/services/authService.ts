export interface LoginCredentials {
    username: string;
    password: string;
}

// Login function
export const login = async (credentials: LoginCredentials): Promise<void> => {
    const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    // Tokens are stored in cookies, so no need to handle them in the frontend
};

// Refresh token function
export const refreshToken = async (): Promise<void> => {
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        credentials: "include", // Include cookies
    });

    if (!response.ok) {
        throw new Error("Token refresh failed");
    }

    // New access_token is stored in cookies
};

// Logout function
export const logout = async (): Promise<void> => {
    const response = await fetch("http://127.0.0.1:8000/logout/", {
        method: "POST",
        credentials: "include", // Include cookies
    });

    if (!response.ok) {
        throw new Error("Logout failed");
    }

    // Cookies are deleted by the backend
};