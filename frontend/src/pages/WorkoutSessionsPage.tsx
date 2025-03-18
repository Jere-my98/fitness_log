// src/pages/WorkoutSessionsPage.tsx
import { useEffect, useState } from "react";
import { fetchWorkoutSessions, fetchWorkoutsForSession } from "@/services/workoutService";
import { LogoutButton } from "@/components/LogoutButton";

export function WorkoutSessionsPage() {
    const [workoutSessions, setWorkoutSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sessions = await fetchWorkoutSessions();
                setWorkoutSessions(sessions);
            } catch (err) {
                setError("Failed to fetch workout sessions");
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Workout Sessions</h1>
            <div className="mb-4">
                <LogoutButton />
            </div>
            {workoutSessions.length > 0 ? (
                workoutSessions.map((session) => (
                    <div key={session.id} className="mb-4 p-4 border rounded">
                        <h3 className="text-lg font-medium">{session.name}</h3>
                        <p>Date: {session.date}</p>
                        <p>Time: {session.time}</p>
                        <h4 className="mt-2">Workouts:</h4>
                        <ul className="list-disc pl-6">
                            {session.workouts.map((workout) => (
                                <li key={workout.id} className="mt-1">
                                    <p>Body Part: {workout.body_part}</p>
                                    <p>Weight: {workout.weight_carried} kg</p>
                                    <p>Sets: {workout.sets}</p>
                                    <p>Reps: {workout.reps}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No workout sessions found.</p>
            )}
        </div>
    );
}