import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/appSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // counter: appSlice,
  },
});
