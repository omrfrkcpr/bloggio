/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  forgotSuccess,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  updateSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { axiosWithPublic } from "./useAxios";
import setups from "../helpers/setup";
import toastNotify from "../helpers/toastNotify";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state: RootState) => state.auth);
  const { path } = useSelector((store: RootState) => store.path);

  const register = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithPublic.post("users/", userInfo);
      // console.log(data);
      dispatch(registerSuccess(data));
      navigate("/");
      toastNotify("success", "You're successfully registered!");
    } catch (error) {
      dispatch(fetchFail());
      toastNotify(
        "error",
        "The register request could not be performed, Please try again!"
      );
      console.log(error);
    }
  };

  const updateUser = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithPublic.put(
        `users/${currentUser?._id}`,
        userInfo,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      dispatch(updateSuccess(data));
      toastNotify("success", "Your profile has been updated successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastNotify(
        "error",
        "The update request could not be performed, Please try again!"
      );
      console.log(error);
    }
  };

  const login = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithPublic.post("auth/login/", userInfo);
      dispatch(loginSuccess(data));
      toastNotify("success", "You're successfully logged in!");
      navigate(path);
    } catch (error) {
      dispatch(fetchFail());
      toastNotify(
        "error",
        "The login request could not be performed, Please try again!"
      );
      console.log(error);
    }
  };

  const signInWithSocial = async (consumerName: string) => {
    window.open(`${setups.BASE_URL}auth/${consumerName}`, "_self");
  };

  const logout = async (showNotify: boolean) => {
    dispatch(fetchStart());
    try {
      await axiosWithPublic.get("auth/logout/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(logoutSuccess());
      showNotify && toastNotify("success", "You're successfully logged out!");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      showNotify &&
        toastNotify(
          "error",
          "The logout request could not be performed, Please try again!"
        );
      console.log(error);
    }
  };

  const forgotPassword = async (email: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithPublic.post("auth/forgot", { email });
      dispatch(forgotSuccess(data));
      toastNotify("success", data?.message);
    } catch (error: any) {
      dispatch(fetchFail());
      toastNotify("error", error?.response?.data?.message);
    }
  };

  return {
    register,
    login,
    signInWithSocial,
    logout,
    updateUser,
    forgotPassword,
  };
};

export default useAuthCall;
