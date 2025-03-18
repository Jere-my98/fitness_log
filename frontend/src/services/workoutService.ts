import { fetchWithAuth } from "./api";

// Fetch all workout sessions
export const fetchWorkoutSessions = async () => {
    const response = await fetchWithAuth("http://127.0.0.1:8000/workout-sessions/"); // Match the Django URL
    const data = await response.json();
    return data;
};

// Fetch workouts for a specific session
export const fetchWorkoutsForSession = async (sessionId: number) => {
    const response = await fetchWithAuth(`http://127.0.0.1:8000/workout-sessions/${sessionId}/workouts/`); // Match the Django URL
    const data = await response.json();
    return data;
};