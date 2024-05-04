import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showNavbarModal: false,
    showHeroModal: false,
    showBlogCardModal: false,
  },
  reducers: {
    setShowNavbarModal(state, { payload }) {
      state.showNavbarModal = payload;
    },
    setShowHeroModal(state, { payload }) {
      state.showHeroModal = payload;
    },
    setShowBlogCardModal(state, { payload }) {
      state.showHeroModal = payload;
    },
  },
});

export const { setShowNavbarModal, setShowHeroModal, setShowBlogCardModal } =
  modalSlice.actions;

export default modalSlice.reducer;
