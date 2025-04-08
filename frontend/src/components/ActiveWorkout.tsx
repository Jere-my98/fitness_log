import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PlusCircle, CheckCircle, X, Plus, Save } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

type Workout = {
  id: string
  name: string
  sets: {
    id: string
    reps: string
    weight: string
  }[]
  completed?: boolean
}

type WorkoutSession = {
  id: string
  date: Date
  name: string
  workouts: Workout[]
}

interface ActiveWorkoutSessionProps {
  workoutSession: WorkoutSession
  onAddWorkout: () => void
  onAddSet: (workoutId: string) => void
  onUpdateSet: (workoutId: string, setId: string, field: "reps" | "weight", value: string) => void
  onSaveWorkout: (workoutId: string) => void
  onFinish: () => void
  onCancel: () => void
}

export default function ActiveWorkoutSession({
  workoutSession,
  onAddWorkout,
  onAddSet,
  onUpdateSet,
  onSaveWorkout,
  onFinish,
  onCancel,
}: ActiveWorkoutSessionProps) {
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(
    workoutSession.workouts.length > 0 ? workoutSession.workouts[workoutSession.workouts.length - 1].id : null,
  )

  const toggleWorkout = (workoutId: string) => {
    setExpandedWorkout(expandedWorkout === workoutId ? null : workoutId)
  }

  // Count completed exercises
  const completedWorkouts = workoutSession.workouts.filter((ex) => ex.completed).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{workoutSession.name}</h2>
          <p className="text-sm text-muted-foreground">
            Started at {format(workoutSession.date, "h:mm a")} •
            {completedWorkouts > 0 && (
              <span className="ml-1">
                {completedWorkouts} of {workoutSession.workouts.length} workouts completed
              </span>
            )}
            {completedWorkouts === 0 && (
              <span className="ml-1">
                {workoutSession.workouts.length} workout{workoutSession.workouts.length !== 1 ? "s" : ""}
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

      {workoutSession.workouts.length > 0 && (
        <div className="space-y-4">
          {workoutSession.workouts.map((workout) => (
            <Card
              key={workout.id}
              className={`overflow-hidden ${workout.completed ? "border-primary/40 bg-primary/5" : ""}`}
            >
              <CardHeader className="p-4 cursor-pointer" onClick={() => toggleWorkout(workout.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{workout.name}</CardTitle>
                    {workout.completed && (
                      <Badge variant="outline" className="text-xs bg-primary/10 border-primary/20">
                        Saved
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {workout.sets.length} {workout.sets.length === 1 ? "set" : "sets"}
                  </div>
                </div>
              </CardHeader>

              {expandedWorkout === workout.id && (
                <>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-3">
                      {workout.sets.map((set, index) => (
                        <div key={set.id} className="grid grid-cols-12 gap-3 items-center">
                          <div className="col-span-1 text-center font-medium">{index + 1}</div>
                          <div className="col-span-5">
                            <Input
                              placeholder="Reps"
                              value={set.reps}
                              onChange={(e) => onUpdateSet(workout.id, set.id, "reps", e.target.value)}
                              className="h-12 text-center"
                              type="number"
                              inputMode="numeric"
                              disabled={workout.completed}
                            />
                          </div>
                          <div className="col-span-6">
                            <Input
                              placeholder="Weight"
                              value={set.weight}
                              onChange={(e) => onUpdateSet(workout.id, set.id, "weight", e.target.value)}
                              className="h-12 text-center"
                              type="number"
                              inputMode="numeric"
                              step="0.5"
                              disabled={workout.completed}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex flex-col gap-3">
                    {!workout.completed && (
                      <>
                        <Button
                          variant="outline"
                          className="w-full py-6 text-base"
                          onClick={() => onAddSet(workout.id)}
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add Set
                        </Button>
                        <Button
                          variant="default"
                          className="w-full py-6 text-base"
                          onClick={() => onSaveWorkout(workout.id)}
                        >
                          <Save className="h-5 w-5 mr-2" />
                          Save Workout
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

      <Button className="w-full py-6 text-lg flex items-center gap-2" onClick={onAddWorkout}>
        <PlusCircle className="h-5 w-5" />
        Add Workout
      </Button>
    </div>
  )
}

