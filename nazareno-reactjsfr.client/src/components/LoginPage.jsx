/* eslint-disable no-unused-vars */
// LoginPage.jsx - Handle multiple roles in UI
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import axios from "axios";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("https://localhost:7115/Auth/login", {username:data.username,password:data.password});
            if (response.data.Token) {
                const dataroles = response.data.Roles || [];
                dispatch(login({ username: data.username, roles: dataroles, token: response.data.Token }));
                navigate("/choices");
            }
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-theme-lightest p-8">
            <h1 className="text-2xl font-bold mb-4 text-theme-dark">Login Page</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-theme-dark font-bold mb-2">Username</label>
                    <input id="username" type="text" {...register("username", { required: "Username is required" })} className="border p-2 w-full" />
                    {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-theme-dark font-bold mb-2">Password</label>
                    <input id="password" type="password" {...register("password", { required: "Password is required" })} className="border p-2 w-full" />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>
                <button type="submit" className="bg-theme-base text-white py-2 px-4 w-full">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
