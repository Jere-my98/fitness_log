import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timer } from "lucide-react"
import WorkoutSessionHistory from "./WorkoutSessionHistory"
import ActiveWorkoutSession from "./ActiveWorkout"
import WorkoutForm from "./WorkoutForm"
import WorkoutSessionDetail from "./WorkoutSessionDetail"

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

export default function WorkoutLogger() {
  const [activeWorkoutSession, setActiveWorkoutSession] = useState<WorkoutSession | null>(null)
  const [workoutSessionName, setWorkoutSessionName] = useState("")
  const [showWorkoutForm, setShowWorkoutForm] = useState(false)
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([])
  const [activeTab, setActiveTab] = useState("logger")
  const [selectedWorkoutSession, setSelectedWorkoutSession] = useState<WorkoutSession | null>(null)

  const startWorkoutSession = () => {
    if (!workoutSessionName) return

    const newWorkoutSession: WorkoutSession = {
      id: crypto.randomUUID(),
      date: new Date(),
      name: workoutSessionName,
      workouts: [],
    }

    setActiveWorkoutSession(newWorkoutSession)
    setWorkoutSessionName("")
  }

  const addWorkoutToWorkoutSession = (workoutName: string) => {
    if (!activeWorkoutSession || !workoutName) return

    const newWorkout: Workout = {
      id: crypto.randomUUID(),
      name: workoutName,
      sets: [
        {
          id: crypto.randomUUID(),
          reps: "",
          weight: "",
        },
      ],
    }

    setActiveWorkoutSession({
      ...activeWorkoutSession,
      workouts: [...activeWorkoutSession.workouts, newWorkout],
    })

    setShowWorkoutForm(false)
  }

  const saveWorkout = (workoutId: string) => {
    if (!activeWorkoutSession) return

    // First check if the workout has at least one completed set
    const workout = activeWorkoutSession.workouts.find((ex) => ex.id === workoutId)
    if (!workout) return

    const hasCompletedSet = workout.sets.some((set) => set.reps && set.weight)
    if (!hasCompletedSet) {
      alert("Please complete at least one set before saving the exercise/workout")
      return
    }

    setActiveWorkoutSession({
      ...activeWorkoutSession,
      workouts: activeWorkoutSession.workouts.map((ex) => {
        if (ex.id === workoutId) {
          return { ...ex, completed: true }
        }
        return ex
      }),
    })
  }

  const updateSet = (workoutId: string, setId: string, field: "reps" | "weight", value: string) => {
    if (!activeWorkoutSession) return

    setActiveWorkoutSession({
      ...activeWorkoutSession,
      workouts: activeWorkoutSession.workouts.map((workout) => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            sets: workout.sets.map((set) => {
              if (set.id === setId) {
                return { ...set, [field]: value }
              }
              return set
            }),
          }
        }
        return workout
      }),
    })
  }

  const addSetToWorkout = (workoutId: string) => {
    if (!activeWorkoutSession) return

    setActiveWorkoutSession({
      ...activeWorkoutSession,
      workouts: activeWorkoutSession.workouts.map((workout) => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            sets: [
              ...workout.sets,
              {
                id: crypto.randomUUID(),
                reps: "",
                weight: "",
              },
            ],
          }
        }
        return workout
      }),
    })
  }

  const finishWorkoutSession = () => {
    if (!activeWorkoutSession) return

    // Filter out empty exercises and sets
    const validWorkouts = activeWorkoutSession.workouts
      .map((workout) => ({
        ...workout,
        sets: workout.sets.filter((set) => set.reps || set.weight),
      }))
      .filter((workout) => workout.name && workout.sets.length > 0)

    if (validWorkouts.length === 0) {
      setActiveWorkoutSession(null)
      setActiveTab("logger")
      return
    }

    const completedWorkoutSession = {
      ...activeWorkoutSession,
      workouts: validWorkouts,
    }

    setWorkoutSessions([completedWorkoutSession, ...workoutSessions])
    setActiveWorkoutSession(null)
    setActiveTab("history")
  }

  const cancelWorkoutSession = () => {
    if (confirm("Are you sure you want to cancel this workout session? All progress will be lost.")) {
      setActiveWorkoutSession(null)
    }
  }

  const viewWorkoutSessionDetail = (workoutsession: WorkoutSession) => {
    setSelectedWorkoutSession(workoutsession)
  }

  const backToHistory = () => {
    setSelectedWorkoutSession(null)
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="logger">Workout Session</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>

      <TabsContent value="logger" className="space-y-6">
        {!activeWorkoutSession ? (
          <Card>
            <CardHeader>
              <CardTitle>Start a New Workout Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workout-session-name">Workout Session Name</Label>
                <Input
                  id="workout-session-name"
                  placeholder="Push Day, Leg Day, etc."
                  value={workoutSessionName}
                  onChange={(e) => setWorkoutSessionName(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full flex items-center gap-2 py-6 text-lg"
                onClick={startWorkoutSession}
                disabled={!workoutSessionName}
              >
                <Timer className="h-5 w-5" />
                Start Workout Session
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <ActiveWorkoutSession
            workoutSession={activeWorkoutSession}
            onAddWorkout={() => setShowWorkoutForm(true)}
            onAddSet={addSetToWorkout}
            onUpdateSet={updateSet}
            onSaveWorkout={saveWorkout}
            onFinish={finishWorkoutSession}
            onCancel={cancelWorkoutSession}
          />
        )}

        {showWorkoutForm && activeWorkoutSession && (
          <WorkoutForm onAdd={addWorkoutToWorkoutSession} onCancel={() => setShowWorkoutForm(false)} />
        )}
      </TabsContent>

      <TabsContent value="history">
        {selectedWorkoutSession ? (
          <WorkoutSessionDetail workoutSession={selectedWorkoutSession as any} onBack={backToHistory} />
        ) : (
          <WorkoutSessionHistory workoutsessions={workoutSessions as any} onViewDetail={viewWorkoutSessionDetail as any} />
        )}
      </TabsContent>
    </Tabs>
  )
}

