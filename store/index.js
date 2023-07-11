import { configureStore } from "@reduxjs/toolkit";
import daySlice from "./slices/daySlice";

export const store = configureStore({
  reducer: {
    day: daySlice,
  },
});
