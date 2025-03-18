import { refreshToken } from "./authService";

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    let response = await fetch(url, {
        ...options,
        credentials: "include", // Include cookies
    });

    // If the access token is expired, try refreshing it
    if (response.status === 401) {
        await refreshToken();
        response = await fetch(url, {
            ...options,
            credentials: "include",
        });
    }

    return response;
};