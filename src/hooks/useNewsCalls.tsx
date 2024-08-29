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

  const getNewsData = async (pageNum: number, categoryName?: string) => {
    dispatch(fetchStart());

    // Current date in the format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    try {
      let url = `${setups.WORLD_NEWS_API_BASE_URL}`;

      if (categoryName) {
        url += `search-news?text=${categoryName}&language=en&offset=${
          (pageNum - 1) * pageLimit
        }&number=${pageLimit}`;
      } else {
        url += `search-news?earliest-publish-date=${today}&language=en&offset=${
          (pageNum - 1) * pageLimit
        }&number=${pageLimit}`;
      }

      const { data } = await axios.get(url, {
        headers: {
          "x-api-key": setups.WORLD_NEWS_API_KEY,
        },
      });

      dispatch(getNews({ data: data?.news }));
      dispatch(
        getTotalPage({ data: (data?.available / pageLimit).toFixed(0) })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Error: ", error.message);
      dispatch(fetchFail());
    }
  };

  return {
    getNewsData,
  };
};

export default useNewsCalls;
