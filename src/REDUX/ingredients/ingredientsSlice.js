import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleReject = (state, action) => {
  state.error = action.payload;
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.pending, handlePending)
      .addCase(fetchIngredients.rejected, handleReject);
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
