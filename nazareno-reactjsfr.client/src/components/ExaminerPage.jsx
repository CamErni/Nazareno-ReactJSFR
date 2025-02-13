/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
    fetchQuestions,
    addQuestionAsync,
    deleteQuestionAsync,
    updateQuestionAsync,
  
} from "../redux/questionsSlice";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../redux/authSlice";


const ExaminerPage = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);
    const { register, handleSubmit, setValue, reset } = useForm();
    const navigate = useNavigate();
    const questionStatus = useSelector((state) => state.questions.status);
    const error = useSelector((state) => state.questions.error);
    const [editIndex, setEditIndex] = useState(null);
    const { isAuthenticated, user } = useSelector((state) => state.auth);


   
    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(logout());
            navigate("/");
        }
        //} else {
        //    handleRefresh();
        //}
        //dispatch(fetchQuestions())
    });
    
    const onSubmit = (data) => {
        if (editIndex !== null) {
            const questionToUpdate = questions[0].find(q => q.id === editIndex);
            console.log(editIndex)
            //const questionToUpdate = questions[0][editIndex];
            dispatch(
                updateQuestionAsync({
                    id: questionToUpdate.id, // Assuming each question has a unique id
                    updatedQuestion: { id:questionToUpdate.id, qst: data.question, ans: data.answer },
                })
            );
            setEditIndex(null);
        } else {
            dispatch(addQuestionAsync({ qst: data.question, ans: data.answer }));
        }
        reset();
    };
    //const handleButtonClick = () => {
    //    if (dispatch(fetchQuestions())) // Dispatch the fetch action
    //    { 
    //        reset();
    //    }
    //};
   
    const handleEdit = (index) => {
        //index=index-1
        const questionToEdit = questions[0].find(q => q.id === index);
        //const questionToEdit = questions[0][index];
        console.log(index)
        setValue("question", questionToEdit.qst);
        setValue("answer", questionToEdit.ans);
        setEditIndex(index);
    };

    const handleDelete = (id) => {
        dispatch(deleteQuestionAsync(id));
        reset();
    };

    const handleGoBack = () => {
        navigate("/choices");
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
    console.log("Questions in ExaminerPage:", questions);
    if (questions.length > 0 && Array.isArray(questions[0])) {
        const ids = questions[0].map(q => q.id);
        console.log(ids);
    }
    

    return (
        
        <div className="flex flex-col items-center justify-center min-h-screen bg-theme-lightest p-8">
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
            <h1 className="text-2xl font-bold mb-4 text-theme-dark">Examiner Page</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <input
                    type="text"
                    placeholder="Question"
                    {...register("question", { required: true })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Answer"
                    {...register("answer", { required: true })}
                    className="border p-2"
                />
                <button
                    type="submit"
                    className="bg-theme-base text-white py-2 px-4 ml-2"
                >
                    {editIndex !== null ? "Update" : "Add"}
                </button>
            </form>
            <div className="w-full max-w-md">
               
                {questions.length > 0 ? (
                    questions[0].map((q, index) => (
                        <div key={index} className="mb-2 flex text-theme-dark items-center">
                            <div className="flex-grow">
                                <span>{q.qst}</span>
                                

                            </div>
                            <div className="flex-grow">
                                <span>{q.ans}</span>
                            </div>
                            <div className="flex-shrink-0">
                                <button
                                    onClick={() => handleEdit(q.id)}
                                    className="bg-yellow-500 text-white py-1 px-2 ml-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(q.id)}
                                    className="bg-red-500 text-white py-1 px-2 ml-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading questions...</p> // Shows loading text until questions are available
                )}
            </div>
            <button
                onClick={handleGoBack}
                className="bg-theme-dark text-white py-2 px-4 mt-4"
            >
                Back to Choices
            </button>
        </div>
    );
};

export default ExaminerPage;
