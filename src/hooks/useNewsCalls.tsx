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
import setups from "../helpers/setup";

const useNewsCalls = () => {
  const dispatch = useDispatch();

  const pageLimit = 3;

  const getNewsData = async (categoryName: string, pageNum: number) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(
        `${setups.WORLD_NEWS_API_BASE_URL}?text=
         ${categoryName}&language=en&offset=${
          (pageNum - 1) * pageLimit
        }&number=${pageLimit}`,
        {
          headers: {
            "x-api-key": setups.WORLD_NEWS_API_KEY,
          },
        }
      );
      // console.log(data?.data);
      dispatch(getNews({ data: data?.news }));
      dispatch(
        getTotalPage({ data: (data?.available / pageLimit).toFixed(0) })
      );
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
