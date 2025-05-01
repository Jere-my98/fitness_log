import apiClient, { BASE_URL } from "./api";

export interface Workout {
    sessionId: number;
    name: string;
    reps: number;
    weight_carried: number;
    sets: Array<{ id:number, reps: number; weight_carried: number }>;    
}

export interface WorkoutSession {
    id: number;
    name: string;
    workouts: Workout[];
    time: string;
    date: Date | string;
}

export const fetchWorkoutSessions = async () => {
    const response = await apiClient.get(`${BASE_URL}workout-sessions/`);
    return response.data;
};

//Create a new workout session
export const createWorkoutSession = async (sessionName: string): Promise<WorkoutSession> => {
    try {
        const response = await apiClient.post<WorkoutSession>(`${BASE_URL}workout-sessions/`, {
            name: sessionName,
            date: new Date()
        });

        return {
            ...response.data,
            date: new Date(response.data.date),
        };
    } catch (error) {
        console.error('Failed to create session:', error);
        throw error;
    }
};

export const addWorkout = async (sessionId: number, workoutName: string): Promise<Workout> => {
    const response = await apiClient.post<Workout>(`${BASE_URL}workout-sessions/${sessionId}/workouts/`, {
        session: sessionId,
        name: workoutName,
        sets: [],
    });

    console.log('I am adding a new workout')
    return {
        ...response.data,
        sets: Array.isArray(response.data.sets) ? response.data.sets.map((set: { id: number ,reps: number; weight_carried: number }) => ({
            id: set.id,
            reps: set.reps,
            weight_carried: set.weight_carried,
        })) : [],
    };
};


