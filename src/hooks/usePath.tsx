/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { setPath } from "../features/pathSlice";

const usePath = () => {
  const dispatch = useDispatch();

  const getNavigatePath = (pathUrl?: string, takeState?: any) => {
    dispatch(setPath({ pathUrl, takeState }));
  };

  return { getNavigatePath };
};

export default usePath;
