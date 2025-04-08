import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface WorkoutFormProps {
  onAdd: (name: string) => void
  onCancel: () => void
}

export default function WorkoutForm({ onAdd, onCancel }: WorkoutFormProps) {
  const [workoutName, setWorkoutName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (workoutName.trim()) {
      onAdd(workoutName.trim())
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Add Workout</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="pb-3">
          <div className="space-y-2">
            <Label htmlFor="workout-name">Workout Name</Label>
            <Input
              id="workout-name"
              placeholder="Bench Press, Squat, etc."
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              autoFocus
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full py-6 text-lg" disabled={!workoutName.trim()}>
            Add Workout
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

