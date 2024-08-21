import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.data;
      state.token = payload?.token;
    },
    updateSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.currentUser = payload?.new;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user;
      state.token = payload?.token;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      // state.isAdmin = false;
      state.token = null;
    },
    forgotSuccess: (state) => {
      state.loading = false;
    },
    resetSuccess: (state) => {
      state.loading = false;
    },
    verifySuccess: (state) => {
      state.loading = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  registerSuccess,
  updateSuccess,
  loginSuccess,
  logoutSuccess,
  forgotSuccess,
  resetSuccess,
  verifySuccess,
  fetchFail,
} = authSlice.actions;
export default authSlice.reducer;
