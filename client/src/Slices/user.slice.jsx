import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "User",
    initialState : {
        userData : null
    },
    reducers: {
        createUser : (state, action) =>{
            // const {data} = action.payload;
            // console.log(data);
            // state.userToken[data]
            state.userData = action.payload;
        }
    }
});

export const {createUser} = userSlice.actions
export const {reducer : userReducer} = userSlice 