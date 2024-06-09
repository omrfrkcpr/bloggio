/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getNews,
  getTotalPage,
} from "../features/newsSlice";

const useNewsCalls = () => {
  const dispatch = useDispatch();

  const pageLimit = 5;

  const getNewsData = async (categoryName: string, pageNum: number) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_MEDIASTACK_BASE_URL}?access_key=${
          import.meta.env.VITE_MEDIASTACK_API_KEY
        }&categories=${categoryName}&offset=${
          (pageNum - 1) * pageLimit
        }&limit=${pageLimit}`
      );
      console.log(data?.data);
      dispatch(getNews({ data: data?.data }));
      dispatch(getTotalPage({ data: data?.pagination?.total / pageLimit }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  return {
    getNewsData,
  };
};

export default useNewsCalls;
