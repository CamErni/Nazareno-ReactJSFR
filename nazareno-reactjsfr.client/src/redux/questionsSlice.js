// questionsSlice.js - Use API interceptor for secure requests with role-based access
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
    questions: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Fetch all questions
export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
    const response = await api.get("/Question");
    return response.data;
});

// Add a new question (only examinees should call this)
export const addQuestionAsync = createAsyncThunk("questions/addQuestion", async (newQuestion) => {
    const response = await api.post("/Question", newQuestion);
    return response.data;
});

// Delete a question (only examiners should call this)
export const deleteQuestionAsync = createAsyncThunk("questions/delete", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/Question/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Delete failed");
    }
});

// Update a question (only examiners should call this)
export const updateQuestionAsync = createAsyncThunk("questions/updateQuestion", async ({ id, updatedQuestion }) => {
    const response = await api.put(`/Question/${id}`, updatedQuestion);
    return response.data;
});

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addQuestionAsync.fulfilled, (state, action) => {
                state.questions.push(action.payload);
            })
            .addCase(deleteQuestionAsync.fulfilled, (state, action) => {
                state.questions = state.questions.filter((q) => q.id !== action.payload);
            })
            .addCase(updateQuestionAsync.fulfilled, (state, action) => {
                const index = state.questions.findIndex((q) => q.id === action.payload.id);
                if (index !== -1) {
                    state.questions[index] = action.payload;
                }
            });
    },
});

export default questionsSlice.reducer;
