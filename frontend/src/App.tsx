// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "@/components/LoginForm";
import { WorkoutSessionsPage } from "@/pages/WorkoutSessionsPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route
                    path="/workout-sessions"
                    element={
                        
                            <WorkoutSessionsPage />
                    }
                />
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}