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
    
    const response = await axios.post('https://localhost:7115/api/Question', newQuestion); // Adjust the URL to your API
    return response.data;
});

export const deleteQuestionAsync = createAsyncThunk('questions/deleteQuestion', async (id) => {
    const response = await axios.delete(`https://localhost:7115/api/Question/${id}`); // Adjust the URL to your API
    if (response){ 
    return id; // Return the id to remove it from the state
}
});

export const updateQuestionAsync = createAsyncThunk('questions/updateQuestion', async ({ id, updatedQuestion }) => {
    const response = await axios.put(`https://localhost:7115/api/Question/${id}`, updatedQuestion); // Adjust the URL to your API
    return response.data;
});

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        // Local state updates can still be handled here if needed
        //reset: () => initialState, // Reset to initial state
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload; // Add the fetched questions to the state
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addQuestionAsync.fulfilled, (state, action) => {
                state.questions.push(action.payload); // Add the new question to the state
            })
            .addCase(deleteQuestionAsync.fulfilled, (state, action) => {
                const pld = state.questions.filter((_, index) => index !== action.payload);
                //const payload = state.questions.filter(question => question.id !== action.payload); // Remove the deleted question
                state.questions=pld
              
            })
            .addCase(updateQuestionAsync.fulfilled, (state, action) => {
                const index = state.questions.findIndex(question => question.id === action.payload.id);
                if (index !== -1) {
                    state.questions[index] = action.payload; // Update the question in the state
                }
            });
    },
});
//export const { reset } = questionsSlice.actions; // Export the reset action
export default questionsSlice.reducer;
