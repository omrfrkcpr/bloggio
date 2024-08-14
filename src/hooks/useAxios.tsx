/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import setups from "../helper/setup";

export const axiosWithPublic = axios.create({
  baseURL: setups.BASE_URL,
});

const useAxios = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const axiosWithToken = axios.create({
    baseURL: setups.BASE_URL,
    headers: { Authorization: `Token ${token}` },
  });
  return axiosWithToken;
};

export default useAxios;
