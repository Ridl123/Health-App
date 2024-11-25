import { createSlice } from "@reduxjs/toolkit";

const caloriesSlice = createSlice({
  name: "calories",
  initialState: {
    totalCalories: 0,
  },
  reducers: {
    setTotalCalories: (state, action) => {
      state.totalCalories = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = caloriesSlice.actions;
export const { setTotalCalories } = caloriesSlice.actions;
export const caloriesReducer = caloriesSlice.reducer;
