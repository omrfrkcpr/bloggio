/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    categories: [],
    blogs: [],
    blogDetails: [],
    trendings: [],
    comments: [],
    saved: [],
    loading: false,
    error: false,
    totalPage: 1,
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state: { [key: string]: any }, { payload: { data, url } }) => {
      state.loading = false;
      state[url] = data;
    },
    getPageSuccess: (state, { payload }) => {
      state.totalPage = payload;
    },
    getDetailSuccess: (state, { payload: { data } }) => {
      state.loading = false;
      state.blogDetails = data;
    },
    getSavedSuccess: (state, { payload: { data } }) => {
      state.loading = false;
      state.saved = data;
    },
    getBlogCommentSuccess: (state, { payload }) => {
      state.loading = false;
      state.blogs = payload[0].data;
      state.comments = payload[1].data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getSuccess,
  getDetailSuccess,
  getSavedSuccess,
  getBlogCommentSuccess,
  fetchFail,
  getPageSuccess,
} = blogSlice.actions;
export default blogSlice.reducer;
