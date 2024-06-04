/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getBlogCommentSuccess,
  getSuccess,
  getSingleBlogSuccess,
  getPageSuccess,
  // getSavedSuccess,
} from "../features/blogSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/toastNotify";
import { singularize } from "../helper/functions";
import { useLocation } from "react-router-dom";

const useBlogCalls = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.auth);

  const getBlogData = async (url: string, search: string = "") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}${search}`);
      // console.log(data);
      dispatch(getSuccess({ data: data?.data, url }));
      if (url === "blogs") {
        dispatch(getPageSuccess(data?.details?.pages?.total));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const getTrendsData = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken("blogs/?page=1&limit=500");
      // console.log(data);
      dispatch(getSuccess({ data: data?.data, url: "trendings" }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const deleteBlogData = async (url: string, id: string) => {
    if (
      confirm(
        `Are you sure you want to delete this ${
          url === "users" ? "Account" : singularize(url)
        }?`
      )
    ) {
      dispatch(fetchStart());
      try {
        await axiosWithToken.delete(`${url}/${id}`);
        toastSuccessNotify(`${singularize(url)} is successfully deleted!`);
      } catch (error: any) {
        console.log(error);
        dispatch(fetchFail());
        toastErrorNotify(
          `${singularize(url)} could not be deleted! ${
            error.message && error.message
          }`
        );
      } finally {
        if (pathname.includes("profile")) {
          getBlogData("blogs", `?author=${currentUser?._id}`);
        } else {
          getBlogData(url);
        }
      }
    }
  };

  const postBlogData = async (url: string, info: object) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${url}`, info);
      getBlogData(url); // only if we post it successfully
      toastSuccessNotify(`New ${singularize(url)} is successfully created!`);
    } catch (error: any) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(
        `New ${singularize(url)} could not be created! ${
          error.message && error.message
        }`
      );
    }
  };

  const putBlogData = async (url: string, info: object, blogId: string) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}/${blogId}`, info);
      toastSuccessNotify(`${singularize(url)} ist successfully updated!`);
    } catch (error: any) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(
        `${singularize(url)} could not be updated! ${
          error.message && error.message
        }`
      );
    } finally {
      getBlogData(url);
    }
  };

  const putCommentData = async (
    url: string,
    commentId: string,
    info: object
  ) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}/${commentId}`, info);
      toastSuccessNotify(`Comment ist successfully updated!`);
    } catch (error: any) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(
        `Comment could not be updated! ${error.message && error.message}`
      );
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

  const getSingleBlog = async (url: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}`);
      // console.log(data);
      dispatch(getSingleBlogSuccess({ data: data?.data }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  // const postSave = async(blogId: string) => {
  //   dispatch(fetchStart());
  //   try {
  //     const {data} = axiosWithToken.put(`blogs/${blogId}/save`);
  //     getBlogData("blogs");
  //     getBlogData("blogs/saved");
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     console.log(error);
  //   }
  // };

  // const deleteSave = async(blogId: string) => {
  //   dispatch(fetchStart());
  //   try {
  //     const {data} = axiosWithToken.delete(`blogs/${blogId}/save`);
  //     getBlogData("blogs");
  //     getBlogData("blogs/saved");
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     console.log(error);
  //   }
  // };

  const postLike = async (url: string, blogId: string | undefined) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${url}`);
      // console.log(`Post Like: ${data}`);
      getBlogData("blogs");
      getSingleBlog(`blogs/${blogId}`);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getLike = async (url: string) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${url}`);
      // console.log(`Post Like: ${data}`);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  return {
    deleteBlogData,
    putBlogData,
    putCommentData,
    postBlogData,
    getBlogData,
    getBlogComment,
    getSingleBlog,
    getTrendsData,
    postLike,
    getLike,
    // postSave,
    // deleteSave,
  };
};

export default useBlogCalls;
