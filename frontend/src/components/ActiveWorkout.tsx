import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PlusCircle, CheckCircle, X, Plus, Save } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

type Exercise = {
  id: string
  name: string
  sets: {
    id: string
    reps: string
    weight: string
  }[]
  completed?: boolean
}

type Workout = {
  id: string
  date: Date
  name: string
  exercises: Exercise[]
}

interface ActiveWorkoutProps {
  workout: Workout
  onAddExercise: () => void
  onAddSet: (exerciseId: string) => void
  onUpdateSet: (exerciseId: string, setId: string, field: "reps" | "weight", value: string) => void
  onSaveExercise: (exerciseId: string) => void
  onFinish: () => void
  onCancel: () => void
}

export default function ActiveWorkout({
  workout,
  onAddExercise,
  onAddSet,
  onUpdateSet,
  onSaveExercise,
  onFinish,
  onCancel,
}: ActiveWorkoutProps) {
  const [expandedExercise, setExpandedExercise] = useState<string | null>(
    workout.exercises.length > 0 ? workout.exercises[workout.exercises.length - 1].id : null,
  )

  const toggleExercise = (exerciseId: string) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId)
  }

  // Count completed exercises
  const completedExercises = workout.exercises.filter((ex) => ex.completed).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{workout.name}</h2>
          <p className="text-sm text-muted-foreground">
            Started at {format(workout.date, "h:mm a")} •
            {completedExercises > 0 && (
              <span className="ml-1">
                {completedExercises} of {workout.exercises.length} exercises completed
              </span>
            )}
            {completedExercises === 0 && (
              <span className="ml-1">
                {workout.exercises.length} exercise{workout.exercises.length !== 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onCancel} className="h-10 w-10">
            <X className="h-5 w-5" />
          </Button>
          <Button variant="default" size="icon" onClick={onFinish} className="h-10 w-10">
            <CheckCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {workout.exercises.length > 0 && (
        <div className="space-y-4">
          {workout.exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className={`overflow-hidden ${exercise.completed ? "border-primary/40 bg-primary/5" : ""}`}
            >
              <CardHeader className="p-4 cursor-pointer" onClick={() => toggleExercise(exercise.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    {exercise.completed && (
                      <Badge variant="outline" className="text-xs bg-primary/10 border-primary/20">
                        Saved
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {exercise.sets.length} {exercise.sets.length === 1 ? "set" : "sets"}
                  </div>
                </div>
              </CardHeader>

              {expandedExercise === exercise.id && (
                <>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-3">
                      {exercise.sets.map((set, index) => (
                        <div key={set.id} className="grid grid-cols-12 gap-3 items-center">
                          <div className="col-span-1 text-center font-medium">{index + 1}</div>
                          <div className="col-span-5">
                            <Input
                              placeholder="Reps"
                              value={set.reps}
                              onChange={(e) => onUpdateSet(exercise.id, set.id, "reps", e.target.value)}
                              className="h-12 text-center"
                              type="number"
                              inputMode="numeric"
                              disabled={exercise.completed}
                            />
                          </div>
                          <div className="col-span-6">
                            <Input
                              placeholder="Weight"
                              value={set.weight}
                              onChange={(e) => onUpdateSet(exercise.id, set.id, "weight", e.target.value)}
                              className="h-12 text-center"
                              type="number"
                              inputMode="numeric"
                              step="0.5"
                              disabled={exercise.completed}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex flex-col gap-3">
                    {!exercise.completed && (
                      <>
                        <Button
                          variant="outline"
                          className="w-full py-6 text-base"
                          onClick={() => onAddSet(exercise.id)}
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add Set
                        </Button>
                        <Button
                          variant="default"
                          className="w-full py-6 text-base"
                          onClick={() => onSaveExercise(exercise.id)}
                        >
                          <Save className="h-5 w-5 mr-2" />
                          Save Exercise
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
        </div>
      )}

      <Button className="w-full py-6 text-lg flex items-center gap-2" onClick={onAddExercise}>
        <PlusCircle className="h-5 w-5" />
        Add Exercise
      </Button>
    </div>
  )
}

