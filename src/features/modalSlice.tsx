import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showNavbarModal: false,
    showHeroModal: false,
  },
  reducers: {
    setShowNavbarModal(state, { payload }) {
      state.showNavbarModal = payload;
    },
    setShowHeroModal(state, { payload }) {
      state.showHeroModal = payload;
    },
  },
});

export const { setShowNavbarModal, setShowHeroModal } = modalSlice.actions;

export default modalSlice.reducer;
