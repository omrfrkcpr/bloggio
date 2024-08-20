/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: false,
};

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { data } }) => {
      state.loading = false;
      state.categories = data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail } = categorySlice.actions;
export default categorySlice.reducer;
