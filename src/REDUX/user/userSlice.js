import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser } from "./operations";
import { updateCurrentUser } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleReject = (state, action) => {
  state.error = action.payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      _id: null,
      email: null,
      name: null,
      height: null,
      calories: null,
      age: null,
      bloodType: null,
    },
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.rejected, handleReject)
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateCurrentUser.pending, handlePending)
      .addCase(updateCurrentUser.rejected, handleReject);
  },
});

export const userReducer = userSlice.reducer;
