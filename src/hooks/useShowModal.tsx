/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { setShowNavbarModal, setShowHeroModal } from "../features/modalSlice";

const useShowModal = () => {
  const dispatch = useDispatch();
  const { showNavbarModal, showHeroModal } = useSelector(
    (state: any) => state.modal
  );

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

  return { toggleNavbarModal, toggleHeroModal };
};

export default useShowModal;
