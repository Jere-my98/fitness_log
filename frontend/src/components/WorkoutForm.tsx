import { useState } from 'react';
import TagSelector from './TagSelector';
import { Button } from "@/components/ui/button";

interface WorkoutFormProps {
    workoutData: {
        id: number;
        sets: number;
        reps: number;
        weight_carried: number;
        tagId: number | null;
    };
    onUpdate: (id: number, updatedWorkout: Partial<any>) => void;
    onDelete: (id: number) => void;
}

export const WorkoutForm = ({ workoutData, onUpdate, onDelete }: WorkoutFormProps) => {
    const [selectedTagId, setSelectedTagId] = useState<number | null>(workoutData.tagId);

    const handleTagChange = (tagId: number | null) => {
        setSelectedTagId(tagId);
        onUpdate(workoutData.id, { tagId });
    };

    return (
        <div className="border p-4 space-y-2 rounded-md shadow-sm">
            <div className="flex gap-2">
                <input
                    type="number"
                    value={workoutData.sets}
                    onChange={(e) => onUpdate(workoutData.id, { sets: Number(e.target.value) })}
                    placeholder="Sets"
                />
                <input
                    type="number"
                    value={workoutData.reps}
                    onChange={(e) => onUpdate(workoutData.id, { reps: Number(e.target.value) })}
                    placeholder="Reps"
                />
                <input
                    type="number"
                    value={workoutData.weight_carried}
                    onChange={(e) => onUpdate(workoutData.id, { weight_carried: Number(e.target.value) })}
                    placeholder="Weight"
                />
            </div>

            <TagSelector
                selectedTagId={selectedTagId}
                workoutId={workoutData.id}
                onTagChange={handleTagChange}
            />

            <div className="flex justify-end gap-2">
                <Button onClick={() => onDelete(workoutData.id)} variant="destructive">
                    Delete
                </Button>
            </div>
        </div>
    );
};
export default WorkoutForm;