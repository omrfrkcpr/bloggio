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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/toastNotify";
import { RootState } from "../app/store";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.auth);
  const { token } = useSelector((store: any) => store.auth);
  const { path } = useSelector((store: RootState) => store.path);

  const register = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}users/`, userInfo);
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
      const { data } = await axios.put(
        `${BASE_URL}users/${currentUser?._id}/`,
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
      const { data } = await axios.post(`${BASE_URL}auth/login/`, userInfo);
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

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.get(`${BASE_URL}auth/logout/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(logoutSuccess());
      toastSuccessNotify("You're successfully logged out!");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        "The logout request could not be performed, Please try again!"
      );
      console.log(error);
    }
  };

  return { register, login, logout, updateUser };
};

export default useAuthCall;
