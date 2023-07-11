import { createSlice } from "@reduxjs/toolkit";

const daySlice = createSlice({
  name: "day",
  initialState: "",
  reducers: {
    addSelectedDay: (state, action) => {
      return action.payload;
    },
  },
});

export const { addSelectedDay } = daySlice.actions;
export const selectSelectedDay = (state) => state.day;
export default daySlice.reducer;
