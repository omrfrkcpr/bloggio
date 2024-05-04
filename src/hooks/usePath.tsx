/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { setPath } from "../features/pathSlice";

const usePath = () => {
  const dispatch = useDispatch();

  const getNavigatePath = (payload?: string) => {
    dispatch(setPath(payload));
  };

  return { getNavigatePath };
};

export default usePath;
