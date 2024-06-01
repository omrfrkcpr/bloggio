/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import {
  setShowNavbarModal,
  setShowHeroModal,
  setShowBlogCardModal,
  setShowCommentsModal,
} from "../features/modalSlice";
import { RootState } from "../app/store";

const useShowModal = () => {
  const dispatch = useDispatch();
  const {
    showNavbarModal,
    showHeroModal,
    showBlogCardModal,
    showCommentsModal,
  } = useSelector((state: RootState) => state.modal);

  const toggleNavbarModal = (payload?: boolean) => {
    dispatch(
      setShowNavbarModal(payload !== undefined ? payload : !showNavbarModal)
    );
  };

  const toggleHeroModal = (payload?: boolean) => {
    dispatch(
      setShowHeroModal(payload !== undefined ? payload : !showHeroModal)
    );
  };

  const toggleBlogCardModal = (payload?: boolean) => {
    dispatch(
      setShowBlogCardModal(payload !== undefined ? payload : !showBlogCardModal)
    );
  };

  const toggleCommentsModal = (payload?: boolean) => {
    dispatch(
      setShowCommentsModal(payload !== undefined ? payload : !showCommentsModal)
    );
  };

  return {
    toggleNavbarModal,
    toggleHeroModal,
    toggleBlogCardModal,
    toggleCommentsModal,
  };
};

export default useShowModal;
