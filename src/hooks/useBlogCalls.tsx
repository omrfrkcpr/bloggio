/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getBlogCommentSuccess,
  getSuccess,
  getDetail,
} from "../features/blogSlice";
import useAxios from "./useAxios";
import { toastSuccessNotify } from "../helper/toastNotify";

const useBlogCalls = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  const singularize = (text: string) => {
    // blogs => Blog
    return text.charAt(0).toUpperCase() + text.slice(1, -1);
  };

  const getBlogData = async (url: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}?limit=300`);
      // console.log(data);

      dispatch(getSuccess({ data: data?.data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const deleteBlogData = async (url: string, id: string) => {
    if (confirm("Are you sure?")) {
      dispatch(fetchStart());
      try {
        await axiosWithToken.delete(`${url}/${id}`);
        toastSuccessNotify(`${singularize(url)} is successfully deleted!`);
      } catch (error) {
        console.log(error);
        dispatch(fetchFail());
        toastSuccessNotify(`${singularize(url)} could not be deleted!`);
      } finally {
        getBlogData(url);
      }
    }
  };

  const postBlogData = async (url: string, info: object) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${url}`, info);
      getBlogData(url); // only if we post it successfully
      toastSuccessNotify(`New ${singularize(url)} is successfully created!`);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastSuccessNotify(`New ${singularize(url)} could not be created!`);
    }
  };

  const putBlogData = async (url: string, info: object) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}/${(info as any)?._id}`, info);
      toastSuccessNotify(`${singularize(url)} ist successfully updated!`);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastSuccessNotify(`${singularize(url)} could not be updated!`);
    } finally {
      getBlogData(url);
    }
  };

  // Get all datas after all fullfilled with Promise.all()
  const getBlogComment = async () => {
    dispatch(fetchStart());
    try {
      // const [a,b] = [1,2] // array destructuring
      const [blogs, comments] = await Promise.all([
        axiosWithToken("blogs"),
        axiosWithToken("comments"),
      ]);
      dispatch(getBlogCommentSuccess([blogs?.data, comments?.data]));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const getBlogDetails = async (url: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}`);
      // console.log(data);
      dispatch(getDetail({ data: data?.data }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const postLike = async (url: string, id: string | undefined) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${url}`);
      // console.log(`Post Like: ${data}`);
      if (id) {
        getBlogDetails("blogs/" + id);
      } else {
        getBlogData("blogs");
      }
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  return {
    deleteBlogData,
    putBlogData,
    postBlogData,
    getBlogData,
    getBlogComment,
    getBlogDetails,
    postLike,
  };
};

export default useBlogCalls;
