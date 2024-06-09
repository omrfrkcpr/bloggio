/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getNews,
  getTotalResult,
} from "../features/newsSlice";

const useNewsCalls = () => {
  const dispatch = useDispatch();

  const getNewsData = async (pageNum: number) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(
        `${
          import.meta.env.VITE_NYT_BASE_URL
        }?fq=news_desk:("Technology")&page=${pageNum}&api-key=${
          import.meta.env.VITE_NYT_API_KEY
        }`
      );
      // console.log(data);
      dispatch(getNews({ data: data?.response?.docs }));
      dispatch(getTotalResult({ data: data?.response?.meta?.hits }));
    } catch (error) {
      // console.log(error);
      dispatch(fetchFail());
    }
  };

  return {
    getNewsData,
  };
};

export default useNewsCalls;
