import axiosInstance, {
    LOGIN_URL,
    LOGOUT_URL,
    REFRESH_TOKEN_URL,
} from "./api";

export interface LoginCredentials {
    username: string;
    password: string;
}

export const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
        await axiosInstance.post(LOGIN_URL, credentials);
    } catch (err) {
        throw new Error("Login failed");
    }
};

export const refreshToken = async (): Promise<void> => {
    try {
        await axiosInstance.post(REFRESH_TOKEN_URL);
    } catch (err) {
        throw new Error("Token refresh failed");
    }
};

export const logout = async (): Promise<void> => {
    try {
        await axiosInstance.post(LOGOUT_URL);
    } catch (err) {
        throw new Error("Logout failed");
    }
};