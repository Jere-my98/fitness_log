import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timer } from "lucide-react"
import WorkoutHistory from "./WorkoutHistory"
import ActiveWorkout from "./ActiveWorkout"
import ExerciseForm from "./ExerciseForm"
import WorkoutDetail from "./WorkoutDetail"

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

export default function WorkoutLogger() {
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null)
  const [workoutName, setWorkoutName] = useState("")
  const [showExerciseForm, setShowExerciseForm] = useState(false)
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [activeTab, setActiveTab] = useState("logger")
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)

  const startWorkout = () => {
    if (!workoutName) return

    const newWorkout: Workout = {
      id: crypto.randomUUID(),
      date: new Date(),
      name: workoutName,
      exercises: [],
    }

    setActiveWorkout(newWorkout)
    setWorkoutName("")
  }

  const addExerciseToWorkout = (exerciseName: string) => {
    if (!activeWorkout || !exerciseName) return

    const newExercise: Exercise = {
      id: crypto.randomUUID(),
      name: exerciseName,
      sets: [
        {
          id: crypto.randomUUID(),
          reps: "",
          weight: "",
        },
      ],
    }

    setActiveWorkout({
      ...activeWorkout,
      exercises: [...activeWorkout.exercises, newExercise],
    })

    setShowExerciseForm(false)
  }

  const saveExercise = (exerciseId: string) => {
    if (!activeWorkout) return

    // First check if the exercise has at least one completed set
    const exercise = activeWorkout.exercises.find((ex) => ex.id === exerciseId)
    if (!exercise) return

    const hasCompletedSet = exercise.sets.some((set) => set.reps && set.weight)
    if (!hasCompletedSet) {
      alert("Please complete at least one set before saving the exercise")
      return
    }

    setActiveWorkout({
      ...activeWorkout,
      exercises: activeWorkout.exercises.map((ex) => {
        if (ex.id === exerciseId) {
          return { ...ex, completed: true }
        }
        return ex
      }),
    })
  }

  const updateSet = (exerciseId: string, setId: string, field: "reps" | "weight", value: string) => {
    if (!activeWorkout) return

    setActiveWorkout({
      ...activeWorkout,
      exercises: activeWorkout.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) => {
              if (set.id === setId) {
                return { ...set, [field]: value }
              }
              return set
            }),
          }
        }
        return exercise
      }),
    })
  }

  const addSetToExercise = (exerciseId: string) => {
    if (!activeWorkout) return

    setActiveWorkout({
      ...activeWorkout,
      exercises: activeWorkout.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: [
              ...exercise.sets,
              {
                id: crypto.randomUUID(),
                reps: "",
                weight: "",
              },
            ],
          }
        }
        return exercise
      }),
    })
  }

  const finishWorkout = () => {
    if (!activeWorkout) return

    // Filter out empty exercises and sets
    const validExercises = activeWorkout.exercises
      .map((exercise) => ({
        ...exercise,
        sets: exercise.sets.filter((set) => set.reps || set.weight),
      }))
      .filter((exercise) => exercise.name && exercise.sets.length > 0)

    if (validExercises.length === 0) {
      setActiveWorkout(null)
      setActiveTab("logger")
      return
    }

    const completedWorkout = {
      ...activeWorkout,
      exercises: validExercises,
    }

    setWorkouts([completedWorkout, ...workouts])
    setActiveWorkout(null)
    setActiveTab("history")
  }

  const cancelWorkout = () => {
    if (confirm("Are you sure you want to cancel this workout? All progress will be lost.")) {
      setActiveWorkout(null)
    }
  }

  const viewWorkoutDetail = (workout: Workout) => {
    setSelectedWorkout(workout)
  }

  const backToHistory = () => {
    setSelectedWorkout(null)
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="logger">Workout</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>

      <TabsContent value="logger" className="space-y-6">
        {!activeWorkout ? (
          <Card>
            <CardHeader>
              <CardTitle>Start a New Workout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workout-name">Workout Name</Label>
                <Input
                  id="workout-name"
                  placeholder="Push Day, Leg Day, etc."
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full flex items-center gap-2 py-6 text-lg"
                onClick={startWorkout}
                disabled={!workoutName}
              >
                <Timer className="h-5 w-5" />
                Start Workout
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <ActiveWorkout
            workout={activeWorkout}
            onAddExercise={() => setShowExerciseForm(true)}
            onAddSet={addSetToExercise}
            onUpdateSet={updateSet}
            onSaveExercise={saveExercise}
            onFinish={finishWorkout}
            onCancel={cancelWorkout}
          />
        )}

        {showExerciseForm && activeWorkout && (
          <ExerciseForm onAdd={addExerciseToWorkout} onCancel={() => setShowExerciseForm(false)} />
        )}
      </TabsContent>

      <TabsContent value="history">
        {selectedWorkout ? (
          <WorkoutDetail workout={selectedWorkout} onBack={backToHistory} />
        ) : (
          <WorkoutHistory workouts={workouts} onViewDetail={viewWorkoutDetail} />
        )}
      </TabsContent>
    </Tabs>
  )
}

