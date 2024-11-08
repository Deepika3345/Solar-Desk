import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "./authService";

const userExist = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: userExist ? userExist : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.isSuccess = false),
          (state.message = "");
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.message = "");
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.payload);
      })

      .addCase(logInUser.pending, (state) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.isSuccess = false),
          (state.message = "");
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.message = "");
        state.user = action.payload;
      })
      .addCase(logInUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.payload);
      })
      // logout
      .addCase(logOut.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
    
          (state.user = null);
      });
  },
});
export default authSlice.reducer;
// Register
export const registerUser = createAsyncThunk(
  "REGISTER/AUTH",
  async (formData, thunkAPI) => {
    try {
      return await authServices.register(formData);
    } catch (error) {
      const message = await error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login
export const logInUser = createAsyncThunk(
  "LOGIN/AUTH",
  async (formData, thunkAPI) => {
    try {
      return await authServices.logIn(formData);
    } catch (error) {
      const message = await error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Logout
export const logOut = createAsyncThunk("LOGOUT/USER", async () => {
  localStorage.removeItem("user");
});
