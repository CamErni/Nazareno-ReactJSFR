/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    questions: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Define async actions
export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
    const response = await axios.get('https://localhost:7115/api/Question'); // Adjust the URL to your API
    return response.data;
});

export const addQuestionAsync = createAsyncThunk('questions/addQuestion', async (newQuestion) => {
    const response = await axios.post('https://localhost:7115/api/Question', newQuestion);
    return response.data;
});

export const deleteQuestionAsync = createAsyncThunk(
    "questions/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`https://localhost:7115/api/Question/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Delete failed");
        }
    }
);

export const updateQuestionAsync = createAsyncThunk('questions/updateQuestion', async ({ id, updatedQuestion }) => {
    const response = await axios.put(`https://localhost:7115/api/Question/${id}`, updatedQuestion);
    return response.data;
});

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addQuestionAsync.fulfilled, (state, action) => {
                state.questions.push(action.payload);
            })
            .addCase(deleteQuestionAsync.fulfilled, (state, action) => {
                state.questions = state.questions.filter(q => q.id !== action.payload);
            })
            .addCase(updateQuestionAsync.fulfilled, (state, action) => {
                const index = state.questions.findIndex(q => q.id === action.payload.id);
                if (index !== -1) {
                    state.questions[index] = action.payload;
                }
            });
    },
});

export default questionsSlice.reducer;
