import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/categorySlice";
import useAxios from "./useAxios";

const useCategory = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  const getCategoryData = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken("categories/sub-categories");
      // console.log(data);
      dispatch(getSuccess({ data: data?.data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  return { getCategoryData };
};

export default useCategory;
