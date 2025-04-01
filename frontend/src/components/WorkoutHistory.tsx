import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { ChevronRight, Dumbbell } from "lucide-react"

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

interface WorkoutHistoryProps {
  workouts: Workout[]
  onViewDetail: (workout: Workout) => void
}

export default function WorkoutHistory({ workouts, onViewDetail }: WorkoutHistoryProps) {
  if (workouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No workouts yet</h3>
        <p className="text-muted-foreground">Start logging your workouts to see your history here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <Card
          key={workout.id}
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => onViewDetail(workout)}
        >
          <CardHeader className="p-4 pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>{workout.name}</CardTitle>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">{format(workout.date, "MMM d, yyyy • h:mm a")}</span>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-sm">
              <span className="font-medium">{workout.exercises.length}</span> exercises •
              <span className="ml-1 font-medium">
                {workout.exercises.reduce((total, ex) => total + ex.sets.length, 0)}
              </span>{" "}
              sets
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

