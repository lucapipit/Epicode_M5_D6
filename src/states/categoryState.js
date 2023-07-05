import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: "",
};


const categorySlice = createSlice({
    name: "myCategories",
    initialState,
    reducers: {
        getCategory: (state, action)=>{
            state.category = action.payload
        },
    }
})

export const {getCategory} = categorySlice.actions;
export default categorySlice.reducer