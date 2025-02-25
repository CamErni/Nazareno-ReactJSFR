// authSlice.js - Persisting JWT authentication and handling multiple roles
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    roles: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.username;
            state.roles = action.payload.roles;
            localStorage.setItem('authToken', action.payload.token);
            localStorage.setItem('userRoles', JSON.stringify(action.payload.roles));
            localStorage.setItem('username', action.payload.username); // Store username
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.roles = [];
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRoles');
        },
        checkAuth: (state) => {
            const token = localStorage.getItem('authToken');
            const roles = JSON.parse(localStorage.getItem('userRoles')) || [];
            const user = localStorage.getItem('username'); // Store username separately

            if (token) {
                state.isAuthenticated = true;
                state.user = user || null;
                state.roles = roles;
            }
        }

    },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
