import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name: "Seller",
  initialState: {
    sellerData: null,
  },
  reducers: {
    setSeller: (state, action) => {
      state.sellerData = action.payload;
    },
    clearSeller: (state) => {
      state.sellerData = null;
    },
  },
});

export const { setSeller, clearSeller } = sellerSlice.actions;
export const { reducer: sellerReducer } = sellerSlice;
