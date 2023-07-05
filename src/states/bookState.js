import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    isLoading: false,
    error: ""
}

const getBooksApi = createAsyncThunk(
    "getBooks/fetchGetBooks",
    async () => {
        try {
            const response = await fetch("https://epibooks.onrender.com/");
            const data = await response.json();
            return data

        } catch (error) {
            console.log("errore: " + error);
            console.error(error)
        }
    }
);


const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        apiGetBooks: (state, action) => {
            state.books = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBooksApi.fulfilled, (state, action) => {
            state.books = action.payload;
            state.isLoading = false
        });
        builder.addCase(getBooksApi.pending, (state, action) => {
            state.books = [];
            state.isLoading = true;
        });
        builder.addCase(getBooksApi.rejected, (state, action) => {
            state.books = [];
            state.error = "la tua chiamata GET è stata rifiutata"
        })
    }
});

export const { apiGetBooks } = bookSlice.actions;
export default bookSlice.reducer
export {getBooksApi}
