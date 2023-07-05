import { createSlice, AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    isLoading: false,
    error: "errore nella chiamata GET"
}

const getCommentsFunc = createAsyncThunk(
    "commenti/fetchCommenti",
    async () => {
        console.log("data");
        const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk1N2YzODlhOGZmMDAwMTRhYjI5NjkiLCJpYXQiOjE2ODc1MTkwMzIsImV4cCI6MTY4ODcyODYzMn0.qjosllSZK6D3HjoPmlXCjD--USRRf0EteNvjoiiBvic";
        const endpoint = "https://striveschool-api.herokuapp.com/api/comments/";
        const response = await fetch(endpoint, {headers: {Authorization: apiKey}});
        const data = await response.json();
        console.log(data);
        return data
    }
)


const commentsSlice = createSlice({
    name: "commentsApi",
    initialState,
    reducers: {
        getComments: (state, action)=>{
            state.comments = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCommentsFunc.fulfilled, (state, action) => {
            state.category = action.payload;
            state.isLoading = false
        });
        builder.addCase(getCommentsFunc.pending, (state, action)=>{
            state.category = [];
            state.isLoading = true
        });
        builder.addCase(getCommentsFunc.rejected, (state)=>{
            state.category = [];
            state.error = state.error;
            state.isLoading = false
        })
    }

})

export const {getComments} = commentsSlice.actions;
export default commentsSlice.reducer;
export {getCommentsFunc}