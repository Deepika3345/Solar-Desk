import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import solarServices from "./solarService";

// Initial state
const initialState = {
  data: {},
  weeklyData: [], 
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Async thunk to fetch energy data
export const solarDataGet = createAsyncThunk(
  "SOLAR/ENERGY",
  async (date, thunkAPI) => {
    try {

      const token = thunkAPI.getState().auth.user.token;
      console.log(token)

      if (!token) {
        return thunkAPI.rejectWithValue("No token available");
      }
      const data = await solarServices.fetchEnergyData(date, token);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Fetch weekly solar data action
export const getWeeklyData = createAsyncThunk(
  'solar/getWeeklyData',
  async ({ startDate, endDate }, thunkAPI) => {
    try {
      // Get the token from the state if necessary (e.g., if you use authentication)
      const token = thunkAPI.getState().auth.user.token;

      // Call the service to fetch weekly data
      return await solarServices.getWeeklyData(startDate, endDate, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);




// Redux slice to manage state
const solarSlice = createSlice({
  name: "solar",
  initialState,
  reducers: {}, // You can add extra reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(solarDataGet.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(solarDataGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(solarDataGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWeeklyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWeeklyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.weeklyData = action.payload; // Store the weekly data in state
      })
      .addCase(getWeeklyData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Store error message
      });

  },
});

export default solarSlice.reducer;
