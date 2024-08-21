import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import BlogAnalytics from "../components/Blog/BlogAnalytics";
import { Avatar } from "@mui/material";
import Loading from "../components/global/Loading";
import CustomImage from "../utils/CustomImage";
import BlogComments from "../components/Blog/BlogComments";
import { RootState } from "../app/store";
import CustomButton from "../utils/CustomButton";

const SingleBlog = () => {
  const { getSingleBlog, getBlogData } = useBlogCalls();
  const { singleBlog, loading } = useSelector(
    (state: RootState) => state?.blog
  );
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();

  // console.log(blogId);

  useEffect(() => {
    if (blogId) {
      getSingleBlog(blogId);
    }
  }, [blogId]);

  useEffect(() => {
    getBlogData("comments");
  }, []);

  const {
    userId,
    categoryId,
    title,
    content,
    image,
    likes,
    countOfVisitors,
    blogDetails,
    updatedAt,
  } = singleBlog || {};

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="page-height flex justify-center items-start">
          <div className="flex flex-col justify-center items-center lg:items-start p-5 w-full max-w-[1000px] mx-auto">
            <div className="mx-auto">
              <CustomImage
                src={image || ""}
                alt="blog-image"
                className="w-[100vw] max-h-[400px] my-5 mx-auto"
              />
            </div>
            <h1
              className="text-[1rem] md:text-[2rem] w-[100%] text-center mt-3 text-[#75a3e3]"
              data-test="blog-title"
            >
              {title}
            </h1>
            <CustomButton
              click={() =>
                navigate(`/categories?filter=${categoryId?.name.toLowerCase()}`)
              }
              className="text-[0.7rem] md:text-[1rem] text-center mb-3 text-white bg-black/30 rounded-md py-[2px] px-2 mx-auto cursor-pointer"
              alt="blog-category"
              title={categoryId?.name || ""}
            />
            <div className="flex justify-between space-x-5 w-[100%] max-w-[1000px] mt-4">
              <div className="flex items-center">
                <Avatar
                  alt={`${userId?.firstName} ${userId?.lastName}`}
                  src={userId?.avatar}
                  sx={{
                    width: { xs: "20px", md: "32px" },
                    height: { xs: "20px", md: "32px" },
                    mr: 1,
                    backgroundColor: "#B9D0F0",
                  }}
                />
                <div className="text-[10px] md:text-[16px]">
                  <p
                    className="text-gray-900 leading-none"
                    data-test="blog-userInfo"
                  >
                    @{userId?.username}
                  </p>
                  <p
                    className="text-gray-600 space-x-1"
                    data-test="blog-details"
                  >
                    <span>{updatedAt} -</span>
                    <span>{blogDetails?.readTime}</span>
                  </p>
                </div>
              </div>
              <div className="flex space-x-1 md:space-x-4">
                <BlogAnalytics
                  likes={likes || []}
                  blogDetails={
                    blogDetails || {
                      countOfLikes: 0,
                      countOfComments: 0,
                      readTime: "",
                      contentPrev: "",
                    }
                  }
                  countOfVisitors={countOfVisitors || 0}
                  _id={blogId}
                  userId={userId?._id}
                />
              </div>
            </div>
            <div
              className="w-[100%] max-w-[1000px] my-5 text-[12px] md:text-[1rem] lg:text-[1.2rem]"
              dangerouslySetInnerHTML={{ __html: content || "" }}
              data-test="blog-description"
            />
          </div>
          <BlogComments blogId={blogId || ""} />
        </div>
      )}
    </>
  );
};

export default SingleBlog;
