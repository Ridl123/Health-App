import { createSlice } from "@reduxjs/toolkit";
import { fetchMeals, addMeals, deleteMeals } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleReject = (state, action) => {
  state.error = action.payload;
};

const mealsSlice = createSlice({
  name: "ingredients",
  initialState: {
    meals: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.meals = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchMeals.pending, handlePending)
      .addCase(fetchMeals.rejected, handleReject)
      .addCase(addMeals.fulfilled, (state, action) => {
        state.meals.push(action.payload.data);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addMeals.pending, handlePending)
      .addCase(addMeals.rejected, handleReject)
      .addCase(deleteMeals.fulfilled, (state, action) => {
        state.meals = state.meals.filter((meal) => meal._id !== action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteMeals.pending, handlePending)
      .addCase(deleteMeals.rejected, handleReject);
  },
});

export const mealsReducer = mealsSlice.reducer;
