/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    categories: [],
    blogs: [],
    blogDetails: [],
    comments: [],
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

    getPage: (state, { payload }) => {
      state.totalPage = payload;
    },

    getDetail: (state, { payload: { data } }) => {
      state.loading = false;
      state.blogDetails = data;
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
  getDetail,
  getBlogCommentSuccess,
  fetchFail,
  getPage,
} = blogSlice.actions;
export default blogSlice.reducer;
