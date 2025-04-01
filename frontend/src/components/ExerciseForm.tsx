import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface ExerciseFormProps {
  onAdd: (name: string) => void
  onCancel: () => void
}

export default function ExerciseForm({ onAdd, onCancel }: ExerciseFormProps) {
  const [exerciseName, setExerciseName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (exerciseName.trim()) {
      onAdd(exerciseName.trim())
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Add Exercise</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="pb-3">
          <div className="space-y-2">
            <Label htmlFor="exercise-name">Exercise Name</Label>
            <Input
              id="exercise-name"
              placeholder="Bench Press, Squat, etc."
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              autoFocus
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full py-6 text-lg" disabled={!exerciseName.trim()}>
            Add Exercise
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

