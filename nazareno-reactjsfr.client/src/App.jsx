/* eslint-disable no-unused-vars */
// App.jsx - Restrict navigation based on user roles
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ChoicePage from "./components/ChoicePage";
import ExaminerPage from "./components/ExaminerPage";
import ExamineePage from "./components/ExamineePage";
import LoginPage from "./components/LoginPage";
import { useSelector } from "react-redux";

const App = () => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/choices" /> : <LoginPage />} />
                <Route path="/choices" element={isAuthenticated ? <ChoicePage /> : <Navigate to="/" />} />
                <Route path="/examiner" element={isAuthenticated && role === "examiner" ? <ExaminerPage /> : <Navigate to="/" />} />
                <Route path="/examinee" element={isAuthenticated && role === "examinee" ? <ExamineePage /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
