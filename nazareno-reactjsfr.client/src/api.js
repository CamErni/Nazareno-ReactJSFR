/* eslint-disable no-unused-vars */
// api.js - Ensure protected API requests include JWT token
import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7115/api",
});

// Login function to authenticate user and get token
export const login = async (user) => {
    try {
        const response = await api.post("/Auth/login", user);
        if (response.data.Token) {
            localStorage.setItem("authToken", response.data.Token);
            localStorage.setItem("userRoles", JSON.stringify(response.data.Roles));
            return response.data;
        }
    } catch (error) {
        throw new Error("Invalid credentials");
    }
};

// Add a request interceptor to attach the token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
