import { createSlice } from "@reduxjs/toolkit";

const daySlice = createSlice({
  name: "day",
  initialState: {
    day: "",
    month: "",
    date: "",
  },
  reducers: {
    addSelectedDay: (state, action) => {
      const { day, date, month } = action.payload;
      state.day = day;
      state.month = month;
      state.date = date;
    },
  },
});

export const { addSelectedDay } = daySlice.actions;
export const selectSelectedDay = (state) => state.day;
export default daySlice.reducer;
