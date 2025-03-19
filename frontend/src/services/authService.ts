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
        console.log("Fetching credentials ...");
        await axiosInstance.post(LOGIN_URL, credentials);
        console.log("Logged in successfully");
    } catch (err) {
        throw new Error("Login failed because of "+err);
    }
};

export const refreshToken = async (): Promise<void> => {
    try {
        await axiosInstance.post(REFRESH_TOKEN_URL);
    } catch (err) {
        throw new Error("Token refresh failed because of "+err);
    }
};

export const logout = async (): Promise<void> => {
    try {
        await axiosInstance.post(LOGOUT_URL);
    } catch (err) {
        throw new Error("Logout failed because of "+err);
    }
};