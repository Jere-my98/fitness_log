import axiosInstance, { BASE_URL } from "./api";

export const fetchWorkoutSessions = async () => {
    const response = await axiosInstance.get(`${BASE_URL}workout-sessions/`);
    return response.data;
};

export const fetchWorkoutsForSession = async (sessionId: number) => {
    const response = await axiosInstance.get(`${BASE_URL}workout-sessions/${sessionId}/workouts/`);
    return response.data;
};