import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WorkoutSessionNameProps {
    initialName: string;
    onSave: (name: string) => void;
}

export default function WorkoutSessionName({ initialName, onSave }: WorkoutSessionNameProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [sessionName, setSessionName] = useState(initialName);

    const handleEditClick = () => setIsEditing(true);

    const handleSave = () => {
        if (sessionName.trim()) {
            onSave(sessionName);
            setIsEditing(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <Input
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyPress}
                    autoFocus
                    className="w-[200px]"
                />
            ) : (
                <span className="text-lg font-semibold">{sessionName}</span>
            )}

            <Button
                variant="outline"
                size="sm"
                onClick={handleEditClick}
                className="px-4"
            >
                Edit
            </Button>
        </div>
    );
}
