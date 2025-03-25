import axiosInstance, { BASE_URL } from "./api";

export const fetchWorkoutSessions = async () => {
    const response = await axiosInstance.get(`${BASE_URL}workout-sessions/`);
    return response.data;
};

export const updateWorkoutSessionName = async (sessionId: number, updatedName: string) => {
    const response = await axiosInstance.patch(`${BASE_URL}workout-sessions/${sessionId}/`, { name: updatedName });
    return response.data;
};

export const fetchWorkoutsForSession = async (sessionId: number) => {
    const response = await axiosInstance.get(`${BASE_URL}workout-sessions/${sessionId}/workouts/`);
    return response.data;
};

export const updateWorkoutDetails = async (
    sessionId: number,
    workoutId: number,
    data: { sets: number; reps: number; weight_carried: number; tag: string }
) => {
    const response = await axiosInstance.patch(`${BASE_URL}workout-sessions/${sessionId}/workouts/${workoutId}/`, data);
    return response.data;
};