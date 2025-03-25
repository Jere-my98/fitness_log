import axiosInstance, {TAG_URL, BASE_URL} from "./api";
import { Tag } from "@/components/TagSelector";
// Fetch all tags
export const fetchTags = async (): Promise<Tag[]> => {
    const response = await axiosInstance.get(TAG_URL);
    return response.data;
};

// Create a new tag
export const createTag = async (tagName: string) => {
    const response = await axiosInstance.post(TAG_URL, { name: tagName });
    return response.data;
};

export const updateWorkoutTag = async (sessionId:number, workoutId: number, tagId: number | null) => {
    const response = await axiosInstance.patch(`${BASE_URL}workout-sessions/${sessionId}/workouts/${workoutId}/`, { tag: tagId });
    return response.data;
};



