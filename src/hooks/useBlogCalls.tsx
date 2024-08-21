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
  getSavedSuccess,
  getTrendBlogs,
} from "../features/blogSlice";
import useAxios from "./useAxios";
import { singularize, singularizeAndCapitalize } from "../helpers/functions";
import { useLocation } from "react-router-dom";
import { updateSuccess } from "../features/authSlice";
import { RootState } from "../app/store";
import showSwal from "../helpers/showSwal";
import toastNotify from "../helpers/toastNotify";

const useBlogCalls = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const getBlogData = async (url: string, search: string = "") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}${search}`);
      // console.log(data);
      dispatch(getSuccess({ data: data?.data, url }));
      if (url === "blogs") {
        dispatch(getPageSuccess(data?.details?.pages?.total));
        dispatch(getTrendBlogs(data?.trendings));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const deleteBlogData = async (url: string, id: string) => {
    const result = await showSwal({
      title: "Are you sure?",
      text: `This ${singularizeAndCapitalize(
        url
      )} will be permanently deleted.`,
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#37901e",
      cancelButtonText: "No, keep it!",
    });

    if (result.isConfirmed) {
      dispatch(fetchStart());
      try {
        await axiosWithToken.delete(`${url}/${id}`);
        toastNotify(
          "success",
          `${
            url === "users" ? "Account" : singularize(url)
          } is successfully deleted!`
        );
      } catch (error: any) {
        console.log(error);
        dispatch(fetchFail());
        toastNotify(
          "error",
          `${
            url === "users" ? "Account" : singularize(url)
          } could not be deleted! ${error.message && error.message}`
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
      toastNotify(
        "success",
        `New ${singularize(url)} is successfully created!`
      );
    } catch (error: any) {
      console.log(error);
      dispatch(fetchFail());
      toastNotify(
        "error",
        `New ${singularize(url)} could not be created! ${
          error.message ? error.response.data.message : error.message
        }`
      );
    }
  };

  const putBlogData = async (url: string, info: object, blogId: string) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}/${blogId}`, info);
      toastNotify("success", `${singularize(url)} ist successfully updated!`);
    } catch (error: any) {
      console.log(error);
      dispatch(fetchFail());
      toastNotify(
        "error",
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
      toastNotify("success", `Comment ist successfully updated!`);
    } catch (error: any) {
      console.log(error);
      dispatch(fetchFail());
      toastNotify(
        "error",
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

  const getSingleBlog = async (blogId: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`blogs/${blogId}`);
      dispatch(getSingleBlogSuccess({ data: data?.data }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const postLike = async (url: string, blogId: string | undefined) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}`);
      // console.log(`Post Like: ${data}`);
      if (pathname.includes("/blog")) {
        getSingleBlog(`blogs/${blogId}`);
      } else {
        getBlogData(
          "blogs",
          `?filter[isPublish]=true&sort[createdAt]=desc&page=1&limit=10`
        );
      }
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const postSave = async (blogId: string | undefined) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(`blogs/${blogId}/save`);
      toastNotify("success", data.message);
      // dispatch(getSavedSuccess());
      dispatch(updateSuccess(data));

      // after successfully request, get updated saved blogs
      getSavedBlogs(currentUser?._id || "");
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

  const getSavedBlogs = async (userId: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`users/${userId}/saved-blogs`);
      dispatch(getSavedSuccess(data));
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
    postLike,
    getLike,
    postSave,
    getSavedBlogs,
  };
};

export default useBlogCalls;
