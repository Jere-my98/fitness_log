// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginForm } from "@/components/LoginForm";
import WorkoutLogger from "@/components/WorkoutLogger";

export default function App() {
  return (
    <Router>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Workout Session Logger</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/workout-logger" element={<WorkoutLogger />} />
        </Routes>
      </main>
    </Router>
  );
}