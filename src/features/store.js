import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import solarSlice from "./solar/solarSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    solar: solarSlice,
  },
});
export default store;
