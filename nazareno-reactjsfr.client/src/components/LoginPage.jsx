// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (userData) => {
        const response = dispatch(login(userData));
        if (response.token) {
            localStorage.setItem('authToken', userData); // Store token in local storage
        }
        
        // Dispatch your login action
    };
    console.log(localStorage.getItem('authToken'))
    const onSubmit = (data) => {
        const hardcodedUser = {
            username: "admin",
            password: "password123",
        };

        if (
            data.username === hardcodedUser.username &&
            data.password === hardcodedUser.password
        ) {
            handleLogin(data.username);
            //dispatch(login({ username: data.username }));
            navigate("/choices");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-theme-lightest p-8">
            <h1 className="text-2xl font-bold mb-4 text-theme-dark">Login Page</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white p-8 rounded shadow-md"
            >
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-theme-dark font-bold mb-2"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        {...register("username", { required: "Username is required" })}
                        className="border p-2 w-full"
                    />
                    {errors.username && (
                        <span className="text-red-500">{errors.username.message}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-theme-dark font-bold mb-2"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className="border p-2 w-full"
                    />
                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-theme-base text-white py-2 px-4 w-full"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
