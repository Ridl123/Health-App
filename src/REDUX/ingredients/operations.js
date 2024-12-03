import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectToken } from "../auth/selectors";

const API_URL_SSL = "https://13.48.177.15:3000/health/";

axios.defaults.baseURL = API_URL_SSL || "http://localhost:3000/health/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkApi.rejectWithValue("No token found");
      }

      setAuthHeader(token);

      const response = await axios.get("/ingredients");
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
