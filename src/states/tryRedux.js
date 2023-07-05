import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myTryState: {
        type: "myType",
        myName: "tryState",
    },
};

const myTryFunction = () => {
    return {
        type: "myNewType",
        myName: "newTryState",
    }
}
const mySecondTryFunction = () => {
    return {
        type: "mySecond",
        myHobby: "art"
    }
        
}

const myTrySlice = createSlice({
    name: "myTryName",
    initialState,
    reducers: {
        myTryReducer: (state, action) => {
            state.myTryState = action.payload;
        }
    }
});

export const { myTryReducer } = myTrySlice.actions;
export { myTryFunction, mySecondTryFunction };
export default myTrySlice.reducer;
