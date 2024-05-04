import { createSlice } from "@reduxjs/toolkit";

const pathSlice = createSlice({
  name: "path",

  initialState: {
    path: "",
    additionalState: null,
  },
  reducers: {
    setPath(state, { payload: { pathUrl, takeState } }) {
      state.path = pathUrl;
      state.additionalState = takeState;
    },
  },
});

export const { setPath } = pathSlice.actions;

export default pathSlice.reducer;
