import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react"

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

interface WorkoutDetailProps {
  workout: Workout
  onBack: () => void
}

export default function WorkoutDetail({ workout, onBack }: WorkoutDetailProps) {
  // Calculate some stats
  const totalSets = workout.exercises.reduce((total, ex) => total + ex.sets.length, 0)
  const totalReps = workout.exercises.reduce((total, ex) => {
    return (
      total +
      ex.sets.reduce((setTotal, set) => {
        return setTotal + (Number.parseInt(set.reps) || 0)
      }, 0)
    )
  }, 0)

  // Find highest weight used for each exercise
  const exerciseMaxWeights = workout.exercises.map((ex) => {
    const maxWeightSet = ex.sets.reduce((max, set) => {
      const weight = Number.parseFloat(set.weight) || 0
      return weight > max ? weight : max
    }, 0)
    return { name: ex.name, maxWeight: maxWeightSet }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">{workout.name}</h2>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Workout Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>{format(workout.date, "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{format(workout.date, "h:mm a")}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{workout.exercises.length}</div>
              <div className="text-xs text-muted-foreground">Exercises</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{totalSets}</div>
              <div className="text-xs text-muted-foreground">Sets</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{totalReps}</div>
              <div className="text-xs text-muted-foreground">Total Reps</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Exercises</h3>

        {workout.exercises.map((exercise, index) => (
          <Card key={exercise.id}>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {index + 1}. {exercise.name}
                </CardTitle>
                <span className="text-sm text-muted-foreground">{exercise.sets.length} sets</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground">
                  <div className="col-span-1">SET</div>
                  <div className="col-span-5">REPS</div>
                  <div className="col-span-6">WEIGHT</div>
                </div>

                {exercise.sets.map((set, setIndex) => (
                  <div
                    key={set.id}
                    className="grid grid-cols-12 gap-2 items-center py-1 border-b border-muted last:border-0"
                  >
                    <div className="col-span-1 text-sm font-medium">{setIndex + 1}</div>
                    <div className="col-span-5 text-sm">{set.reps || "-"}</div>
                    <div className="col-span-6 text-sm">{set.weight || "-"}</div>
                  </div>
                ))}
              </div>

              {/* Stats per exercise */}
              <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Total reps:</span>
                  <span className="font-medium">
                    {exercise.sets.reduce((total, set) => total + (Number.parseInt(set.reps) || 0), 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Max weight:</span>
                  <span className="font-medium">
                    {exerciseMaxWeights.find((e) => e.name === exercise.name)?.maxWeight || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

