/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChoicePage from "./components/ChoicePage";
import ExaminerPage from "./components/ExaminerPage";
import ExamineePage from "./components/ExamineePage";
import LoginPage from "./components/LoginPage";
import { useDispatch } from "react-redux";
//import { login } from "./redux/authSlice";
import { useNavigate } from 'react-router-dom';

const App = () => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
   
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Dispatch an action to set the user as authenticated
            setIsAuthenticated(true); // Adjust this based on your login action
        }
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/choices" element={<ChoicePage />} />
                <Route path="/examiner" element={<ExaminerPage />} />
                <Route path="/examinee" element={<ExamineePage />} />
            </Routes>
        </Router>
    );
};

export default App;
