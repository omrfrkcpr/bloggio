/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "bloggio",

  initialState: {
    categories: [],
    blogs: [],
    comments: [],
    loading: false,
    error: false,
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    getSuccess: (
      state,
      { payload: { data, url } }: { payload: { data: any; url: string } }
    ) => {
      state.loading = false;
      state[url as keyof typeof state] = data;
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

export const { fetchStart, getSuccess, getBlogCommentSuccess, fetchFail } =
  blogSlice.actions;
export default blogSlice.reducer;
