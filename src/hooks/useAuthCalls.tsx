import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/toastNotify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);

  const register = async (userInfo: object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}users/`, userInfo);
      console.log(data);
      dispatch(registerSuccess(data));
      navigate("/login");
      toastSuccessNotify("You're successfully registered!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        "The register request could not be performed, Please try again!"
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
      navigate("/new-blog");
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

  return { register, login, logout };
};

export default useAuthCall;
