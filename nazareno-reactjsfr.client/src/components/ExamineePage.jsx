/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ModalScore from "../shared/ModalScore";
import { logout } from "../redux/authSlice";

const ExamineePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);
    const { register, handleSubmit } = useForm();
    const [score, setScore] = useState(null);
    const { isAuthenticated, user, roles } = useSelector((state) => state.auth);
    const [pass, setPass] = useState(null);

    useEffect(() => {
        if (!isAuthenticated || !roles.includes("examinee")) {
            dispatch(logout());
            navigate("/");
        }
    }, [isAuthenticated, roles, dispatch, navigate]);

    const onSubmit = (data) => {
        let newScore = 0;
        const passingGrade = questions.length / 2;
        questions.forEach((q, index) => {
            if (
                data[`answer${index}`] &&
                data[`answer${index}`].toLowerCase().trim() === q.ans.toLowerCase()
            ) {
                newScore++;
            }
        });
        setScore(newScore);

        if (passingGrade <= newScore) {
            setPass(true);
        } else setPass(false);
    };

    const handleGoBack = () => {
        navigate("/choices");
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const resetScore = () => {
        setScore(null);
    };

    const closeModal = () => {
        setScore(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-theme-lightest p-8">
            {isAuthenticated && (
                <div className="w-full flex justify-between items-center p-4 bg-theme-dark text-white fixed top-0 left-0">
                    <span className="text-lg">Welcome, {user.username}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-theme-light text-theme-dark py-2 px-4 rounded hover:bg-theme-base"
                    >
                        Logout
                    </button>
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4 text-theme-dark mt-16">
                Examinee Page
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                {questions.map((q, index) => (
                    <div key={index} className="mb-4 bg-white shadow-md rounded p-4">
                        <span className="text-theme-dark block mb-2">{q.qst}</span>
                        <input
                            type="text"
                            {...register(`answer${index}`, { required: true })}
                            onChange={resetScore}
                            className="border p-2 w-full"
                        />
                    </div>
                ))}
                <div className="flex flex-col items-center justify-center bg-theme-lightest">
                    <button type="submit" className="bg-theme-base text-white py-2 px-4">
                        Submit
                    </button>
                    <button
                        onClick={handleGoBack}
                        className="bg-theme-dark text-white py-2 px-4 mt-4"
                    >
                        Back to Choices
                    </button>
                </div>
            </form>
            {score !== null && (
                <ModalScore score={score} closeModal={closeModal} passed={pass} />
            )}
        </div>
    );
};

export default ExamineePage;
