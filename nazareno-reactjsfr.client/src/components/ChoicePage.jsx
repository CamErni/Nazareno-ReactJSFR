/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { fetchQuestions } from "../redux/questionsSlice";

const ChoicePage = () => {
    const [disableButton, setDisableButton] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user, roles } = useSelector((state) => state.auth);
    const questions = useSelector((state) => state.questions.questions);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(logout());
            navigate("/");
        }
        dispatch(fetchQuestions());
    }, [isAuthenticated, dispatch, navigate]);

    useEffect(() => {
        setDisableButton(questions.length === 0);
    }, [questions]);

    // Ensure roles is always an array
    const userRoles = roles || [];

    // Function to check if user has a specific role
    const hasRole = (role) => userRoles.includes(role);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-theme-lightest">
            {isAuthenticated && (
                <div className="w-full flex justify-between items-center p-4 bg-theme-dark text-white fixed top-0 left-0">
                    <span className="text-lg">Welcome, {user}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-theme-light text-theme-dark py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            )}
            <h1 className="text-4xl font-bold mb-8 text-theme-dark mt-4">Quiz App</h1>
            <div>
                {hasRole("examiner") && (
                    <button
                        onClick={() => navigate("/examiner")}
                        className="bg-theme-base text-white py-2 px-4 rounded m-2"
                    >
                        Examiner
                    </button>
                )}
                {hasRole("examinee") && (
                    <button
                        onClick={() => navigate("/examinee")}
                        className="bg-theme-dark text-white py-2 px-4 rounded m-2 disabled:bg-gray-400"
                        disabled={disableButton}
                    >
                        Examinee
                    </button>
                )}
            </div>
        </div>
    );
};

export default ChoicePage;
