import { createSlice, AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    comments: [],//all comments from the api call
    filteredComments: [],//all comments filtered in relation to the selected book
    selectedBookName: "",//the name of the book selected
    isLightMode: true,//light/dak mode setting
    rateAverage: 0,//refers to the rate average of all comments of a selected book
    isFirstOpen: true,//refers to the first loading of the app. Once a book comment section is selcted it does became false
    isLoading: false,//refers to an api call
    error: "",
    //for the POST
    postRating: "",//store the rating for the post
    postComment: "",//store the comment for the post
    postElementId: "",//store the id for the post
    currentAsin: "",//set the current asin
    //for the PUT 
    isOnChanging: false,
    displayComment: "",//store the comment
    displayRate: 0,//store the rate
    putCurrentId: "",//store the id

}

const getCommentsFunc = createAsyncThunk(
    "commenti/fetchCommenti",

    async (input) => {
        try {
            const getParam = () => { return input ? (endpoint + input) : endpoint }
            const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkZDIyOTM5N2RmMTAwMTRkZGRkYjgiLCJpYXQiOjE2ODg2NDA3NjksImV4cCI6MTY4OTg1MDM2OX0.N0MTkbfQrBoKQ9niJjM1icRMh8Lu47QGOWCgrkmbjOQ";
            const endpoint = "https://striveschool-api.herokuapp.com/api/comments/";
            const response = await fetch(getParam(), { headers: { Authorization: apiKey } });
            const data = await response.json();
            console.log(data);
            return data

        } catch (error) {
            console.log("La chiamata GET è fallita!");
        }
    }
);
const postCommentsFunc = createAsyncThunk(
    "postCommenti/fetchPostCommenti",
    async (input) => {
        if (true /* inputComment && inputRate && inputId */) {
            try {
                const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkZDIyOTM5N2RmMTAwMTRkZGRkYjgiLCJpYXQiOjE2ODg2NDA3NjksImV4cCI6MTY4OTg1MDM2OX0.N0MTkbfQrBoKQ9niJjM1icRMh8Lu47QGOWCgrkmbjOQ";
                const endpoint = "https://striveschool-api.herokuapp.com/api/comments/";
                await fetch(endpoint, {
                    method: "POST",
                    headers: { "Authorization": apiKey, "Content-Type": "application/json" },
                    body: JSON.stringify(input)
                });
                console.log("post del commento riuscito!");

            } catch (error) {
                console.log("La chiamata POST è fallita!");
            }
        } else {
            console.log("compila tutti i campi");
        }
    }
);
const putCommentsFunc = createAsyncThunk(
    "updateCommenti/fetchUpdateCommenti",
    async (input) => {
        try {
            console.log(input._id);
            const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkZDIyOTM5N2RmMTAwMTRkZGRkYjgiLCJpYXQiOjE2ODg2NDA3NjksImV4cCI6MTY4OTg1MDM2OX0.N0MTkbfQrBoKQ9niJjM1icRMh8Lu47QGOWCgrkmbjOQ";
            const endpoint = "https://striveschool-api.herokuapp.com/api/comments/";
            await fetch(endpoint + input._id, {
                method: "PUT",
                headers: { "Authorization": apiKey, "Content-Type": "application/json" },
                body: JSON.stringify(input)
            });
            console.log("update riuscito!", input);
        } catch (error) {
            console.log("la chiamata PUT è fallita");
        }
    }
);
const deleteCommentsFunc = createAsyncThunk(
    "deleteCommenti/fetchDeleteCommenti",
    async (input) => {
        try {
            const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkZDIyOTM5N2RmMTAwMTRkZGRkYjgiLCJpYXQiOjE2ODg2NDA3NjksImV4cCI6MTY4OTg1MDM2OX0.N0MTkbfQrBoKQ9niJjM1icRMh8Lu47QGOWCgrkmbjOQ";
            const endpoint = "https://striveschool-api.herokuapp.com/api/comments/";
            await fetch(endpoint + input, {
                method: "DELETE",
                headers: { "Authorization": apiKey },
            });
            console.log("delete riuscito!");
        } catch (error) {
            console.log("la chiamata DELETE è fallita");
        }
    }
);



const commentsSlice = createSlice({
    name: "commentsApi",
    initialState,
    reducers: {
        filterComments: (state, action) => {//filter the comments in relation to the selected book
            state.isFirstOpen = false;
            
            if(action.payload){
                const myAsin = action.payload;
                state.filteredComments = state.comments.filter((el) => {
                    if (el.elementId === myAsin) {
                        console.log(el.elementId);
                        return true
                    }
                    return false
                });
            }else{
                console.log(action.payload);
                state.filteredComments = state.comments
            }
        },
        starRateAverage: (state, action) => {//display the stars verage rating

            if (state.filteredComments.length===0 && state.isFirstOpen) {
                const numberOfComments = state.comments.length;
                const myFilteredComments = state.comments;
                let myCounter = 0;
                myFilteredComments.map((el) => {
                    myCounter += parseInt(el.rate);
                });
                console.log(myCounter, numberOfComments, state.filteredComments.length);
                state.rateAverage = Math.round(myCounter / numberOfComments);
            } else {
                state.selectedBookName = action.payload;
                const numberOfComments = state.filteredComments.length;
                const myFilteredComments = state.filteredComments;
                let myCounter = 0;
                myFilteredComments.map((el) => {
                    myCounter += parseInt(el.rate);
                });
                console.log(myCounter, numberOfComments);
                state.rateAverage = Math.round(myCounter / numberOfComments);
            }

        },
        setIsFirstOpen: (state, action) => {//it's used to display the edit button(light blue pencil) on comments card when a card is selected
            state.isFirstOpen = true
        },
        setTheme: (state, action) => {//set the light/dark mode
            state.isLightMode = !state.isLightMode
        },
        //for the POST
        setRating: (state, action) => {//set the value of the rating for the post call
            state.postRating = action.payload;
        },
        setComment: (state, action) => {//store the comment for the post call
            state.postComment = action.payload;
        },
        setElementId: (state, action) => {//store the elementId for the post call
            state.postElementId = action.payload;
        },
        setCurrentAsin: (state, action) => {//store the asin for the post call
            state.currentAsin = action.payload
        },
        //for the PUT
        isEditing: (state, action) => {//activate some functions when the edit modal is opened
            state.isOnChanging = action.payload;
        },
        displayMyComment: (state, action) => {//displays comment in the form input
            state.comments = (state.comments).filter((el) => {
                return el._id === action.payload
            });
        },
        setCurrentId: (state, action) => {//set the id for the post call
            state.putCurrentId = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getCommentsFunc.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.isLoading = false;
            console.log("Fulfilled");
        });
        builder.addCase(getCommentsFunc.pending, (state, action) => {
            state.comments = [];
            state.isLoading = true;
            console.log("Pending");
        });
        builder.addCase(getCommentsFunc.rejected, (state) => {
            state.comments = [];
            state.error = "errore nella chiamata GET";
            state.isLoading = false
        });

    }

})

export const {
    getComments, filterComments, starRateAverage,
    setTheme, setRating, setComment, setElementId,
    setCurrentAsin, isEditing, displayMyComment,
    setCurrentId, setIsFirstOpen
} = commentsSlice.actions;
export default commentsSlice.reducer;
export { getCommentsFunc, postCommentsFunc, putCommentsFunc, deleteCommentsFunc }