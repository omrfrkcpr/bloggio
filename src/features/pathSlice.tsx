import { createSlice } from "@reduxjs/toolkit";

const pathSlice = createSlice({
  name: "path",

  initialState: {
    path: "",
  },
  reducers: {
    setPath(state, { payload }) {
      state.path = payload;
    },
  },
});

export const { setPath } = pathSlice.actions;

export default pathSlice.reducer;
