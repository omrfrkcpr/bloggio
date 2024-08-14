/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  updateSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/toastNotify";
import { RootState } from "../app/store";
import { axiosWithPublic } from "./useAxios";
import setups from "../helper/setup";


const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.auth);
  const { token } = useSelector((store: any) => store.auth);
  const { path } = useSelector((store: RootState) => store.path);

  const register = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithPublic.post("users/", userInfo);
      // console.log(data);
      dispatch(registerSuccess(data));
      navigate("/");
      toastSuccessNotify("You're successfully registered!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        "The register request could not be performed, Please try again!"
      );
      console.log(error);
    }
  };

  const updateUser = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithPublic.put(
        `users/${currentUser?._id}/`,
        userInfo,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      dispatch(updateSuccess(data));
      toastSuccessNotify("Your profile has been updated successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
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
      toastSuccessNotify("You're successfully logged in!");
      navigate(path);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
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
      showNotify && toastSuccessNotify("You're successfully logged out!");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      showNotify &&
        toastErrorNotify(
          "The logout request could not be performed, Please try again!"
        );
      console.log(error);
    }
  };

  return { register, login, signInWithSocial, logout, updateUser };
};

export default useAuthCall;
