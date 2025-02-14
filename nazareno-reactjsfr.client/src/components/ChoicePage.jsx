/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import {
    fetchQuestions
} from "../redux/questionsSlice";
const ChoicePage = () => {
    const [disableButtn, setDisableButtn] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
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
        if (questions.length === 0) {
            setDisableButtn(true);
        } else setDisableButtn(false);
        dispatch(fetchQuestions());
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-theme-lightest">
            {isAuthenticated && (
                <div className="w-full flex justify-between items-center p-4 bg-theme-dark text-white fixed top-0 left-0">
                    <span className="text-lg">Welcome, {user.username}</span>
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
                <button
                    onClick={() => navigate("/examiner")}
                    className="bg-theme-base text-white py-2 px-4 rounded m-2"
                >
                    Examiner
                </button>
                <button
                    onClick={() => navigate("/examinee")}
                    className="bg-theme-dark text-white py-2 px-4 rounded m-2 disabled:bg-gray-400"
                    disabled={disableButtn}
                >
                    Examinee
                </button>
            </div>
        </div>
    );
};

export default ChoicePage;
