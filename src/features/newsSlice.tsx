/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    loading: false,
    news: [],
    error: false,
    totalPage: 0,
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
    getTotalPage: (state, { payload: data }) => {
      state.loading = false;
      state.totalPage = data?.data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    resetNews: (state) => {
      state.news = [];
      state.error = false;
      state.loading = false;
      state.totalPage = 0;
    },
  },
});

export const { fetchStart, getNews, getTotalPage, fetchFail, resetNews } =
  newsSlice.actions;

export default newsSlice.reducer;
