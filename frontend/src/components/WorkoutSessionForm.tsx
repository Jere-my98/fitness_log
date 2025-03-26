import { useState } from "react";
import { WorkoutForm } from "./WorkoutForm";
import { Button } from "@/components/ui/button";
import WorkoutSessionName from "./WorkoutSessionName";
import { updateWorkoutSessionName, updateWorkoutDetails } from "@/services/workoutService";
import NumberControl from "./NumberControl";

interface WorkoutData {
  id: number;
  sets: number;
  reps: number;
  weight_carried: number;
  tag: string;
}

const WorkoutSessionForm = () => {
  const [sessionId] = useState<number | null>(null); // Add sessionId state
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight_carried, setWeightcarried] = useState(50);
  const [tag, setTag] = useState<string>("");

  const handleSaveWorkoutDetails = async (workoutId: number) => {
    try {
        if (sessionId !== null) {
          await updateWorkoutDetails(sessionId, workoutId, { sets, reps, weight_carried, tag });
        } else {
          console.error("Session ID is not set");
        }
        console.log("Workout details updated successfully");
    } catch (error) {
        console.error("Error updating workout details:", error);
    }
};

  const handleSaveSessionName = async (updatedName: string) => {
    if (!sessionId) {
      console.error("Session ID is not set");
      return;
    }
    try {
      await updateWorkoutSessionName(sessionId, updatedName);
      console.log("Workout Session Name Updated Successfully");
    } catch (error) {
      console.error("Error updating workout session name:", error);
    }
  };

  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);

  const addWorkout = () => {
    const newWorkout: WorkoutData = {
      id: Date.now(),
      sets: sets,
      reps: reps,
      weight_carried: weight_carried,
      tag: tag,
    };
    setWorkouts([...workouts, newWorkout]);
  };


  const deleteWorkout = (id: number) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.filter((workout) => workout.id !== id)
    );
  };

  const handleSubmit = () => {
    console.log("Workout Session Data:", workouts);
    // Submit logic (API call) goes here
  };

  return (
    <>
      <WorkoutSessionName
        initialName="Leg Day"
        onSave={handleSaveSessionName}
      />
      <div className="space-y-4">
        {workouts.map((workout) => (
          <WorkoutForm
            key={workout.id}
            workoutData={workout}
            onUpdate={handleSaveWorkoutDetails}
            onDelete={deleteWorkout}
          />
        ))}
            <div className="space-y-4">
            <NumberControl label="Sets" value={sets} onChange={setSets} min={1} />
            <NumberControl label="Reps" value={reps} onChange={setReps} min={1} />
            <NumberControl label="Weight" value={weight_carried} onChange={setWeightcarried} min={0} />
            <div>
              <label htmlFor="tag">Tag</label>
              <input
                id="tag"
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="input"
              />
            </div>
        </div>

        <Button onClick={addWorkout} variant="outline">
          + Add Workout
        </Button>

      </div>
        <Button onClick={handleSubmit} variant="default">
          Save Workout Session
        </Button>
    </>
  );
};

export default WorkoutSessionForm;