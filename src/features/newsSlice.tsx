/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    loading: false,
    news: [],
    error: false,
    totalResults: 0,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getNews: (state, { payload: { data } }) => {
      state.loading = false;
      state.news = data;
    },
    getTotalResult: (state, { payload: data }) => {
      state.loading = false;
      state.totalResults = data?.data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getNews, getTotalResult, fetchFail } =
  newsSlice.actions;

export default newsSlice.reducer;
