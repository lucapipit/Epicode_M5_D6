import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: "",
    filteredSearchBooks: null,
    singleBook: "null"
};


const categorySlice = createSlice({
    name: "myCategories",
    initialState,
    reducers: {
        getCategory: (state, action)=>{
            state.category = action.payload
        },
        searchFilter: (state, action) => {
            if(action.payload){
                state.filteredSearchBooks = state.category.filter((el)=>{
                    return el.title.toLowerCase().includes(action.payload.toLowerCase())
                })
                console.log(state.filteredSearchBooks);
            }else{
                state.filteredSearchBooks = state.category
            }
        },
        selectSingleBook: (state, action) => {
            state.singleBook = state.category.filter((el)=>{
                console.log("x");
                return el.asin == action.payload
            });
        }
    }
})

export const {getCategory, searchFilter, selectSingleBook, importBooksFromData} = categorySlice.actions;
export default categorySlice.reducer