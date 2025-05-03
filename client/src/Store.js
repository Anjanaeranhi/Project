import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slices/user.slice";
import { sellerReducer } from "./Slices/seller.slice";

export const store =  configureStore({
    reducer: {
        "User" : userReducer,
        "Seller": sellerReducer,
    }
});