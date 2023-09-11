// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listExam: [],
    listCategory: [],
    listTest: [],
};

export const examSlice = createSlice({
    name: "exams",
    initialState: initialState,
    reducers: {
        handleGetListExam: (state, action) => {
            console.log("actionListExam", action.payload.data)
            state.listExam = action.payload.data
        },
        handleGetListCategory: (state, action) => {
            state.listCategory = action.payload.data
        },
        handleGetListTest: (state, action) => {
            state.listTest = action.payload.data
        },
    },
});

export const { handleGetListExam, handleGetListCategory, handleGetListTest } = examSlice.actions;

export default examSlice.reducer;
