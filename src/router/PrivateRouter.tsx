/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../app/store";

const PrivateRouter = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  // console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
