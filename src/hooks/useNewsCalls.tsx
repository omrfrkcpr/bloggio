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

  const getNewsData = async (countryCode: string, pageNum: number) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(
        `${
          import.meta.env.VITE_NEWSAPI_BASE_URL
        }&country=${countryCode}&page=${pageNum}&pageSize=5&apiKey=${
          import.meta.env.VITE_NEWSAPI_API_KEY
        }`
      );
      // console.log(data);
      const filteredData = data?.articles.filter((article: Article) => {
        const { title, description } = article;
        return title !== "[Removed]" && description !== "[Removed]";
      });

      const removedDataNumber = data?.articles.filter((article: Article) => {
        const { title, description } = article;
        return title === "[Removed]" || description === "[Removed]";
      });

      dispatch(getNews({ data: filteredData }));
      dispatch(
        getTotalResult({ data: data?.totalResults - removedDataNumber.length })
      );
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
