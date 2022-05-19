import { createSlice } from "@reduxjs/toolkit";

const main = createSlice({
  name: "main",
  initialState: {
    data: [],
  },
  reducers: {
    getDataSuccess: (state, action) => {
      return {
        data: action.payload,
      };
    },
  },
});

export const { getDataSuccess } = main.actions;

export default main.reducer;
