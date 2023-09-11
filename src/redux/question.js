// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listQuestion: [],
    listQuestionType: [],
    listCategory: [],
};

export const questionSlice = createSlice({
    name: "questions",
    initialState: initialState,
    reducers: {
        handleGetListQuestion: (state, action) => {
            state.listQuestion = action.payload.data
        },
        handleGetListCategory: (state, action) => {
            state.listCategory = action.payload.data
        },
        handleGetListQuestionType: (state, action) => {
            state.listQuestionType = action.payload.data
        }
    },
});

export const { handleGetListQuestion, handleGetListCategory, handleGetListQuestionType } = questionSlice.actions;

export default questionSlice.reducer;
