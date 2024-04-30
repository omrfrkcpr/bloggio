/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useSelector } from "react-redux";

export const axiosWithPublic = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const useAxios = () => {
  const { token } = useSelector((state: any) => state.auth);
  const axiosWithToken = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { Authorization: `Token ${token}` },
  });
  return axiosWithToken;
};

export default useAxios;
