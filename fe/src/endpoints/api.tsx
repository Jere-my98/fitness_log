import axios from "axios";

const BASE_URL = "http://localhost:8000/";
const LOGIN_URL = `${BASE_URL}login/`;

interface LoginResponse {
    success: boolean;
}

export const login = async (username: string, password: string): Promise<boolean> => {
    const response = await axios.post<LoginResponse>(
        LOGIN_URL,
        {
            username: username,
            password: password,
        },
        { withCredentials: true }
    );
    console.log(response.data);
    return response.data.success;
};
