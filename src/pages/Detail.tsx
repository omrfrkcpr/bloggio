/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
// import { RootState } from "../app/store";
import useBlogCalls from "../hooks/useBlogCalls";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import BlogAnalytics from "../components/commons/BlogAnalytics";
// import CommentForm from "../components/Forms/CommentForm";
import { dateFormatter, calculateReadTime } from "../helper/functions";
import { Avatar } from "@mui/material";

const Detail = () => {
  // const { currentUser } = useSelector((state: RootState) => state?.auth);
  const { getBlogDetails } = useBlogCalls();
  const { blogDetails } = useSelector((state: any) => state?.blog);
  // console.log("Blog Detail:", blogDetails);
  const { id } = useParams();
  // console.log("Blog ID:", id);
  const location = useLocation();
  const { state } = location;
  // const [show, setShow] = useState(false);

  useEffect(() => {
    getBlogDetails(`blogs/${id}`);
  }, []);

  const {
    randomFirstName = "",
    randomLastName = "",
    userImage = "",
    categoryName = "",
  } = state || {};

  const {
    userId,
    // categoryId,
    title,
    content,
    image,
    comments,
    likes,
    countOfVisitors,
    createdAt,
  } = blogDetails;

  const isDicebearImage = userImage.startsWith(
    "https://api.dicebear.com/8.x/avataaars/svg?seed="
  );

  return (
    <div className="min-h-[85.2vh] flex justify-center">
      <div className="flex flex-col justify-center items-center lg:items-start p-5">
        <img src={image} alt="" className="w-[90%] max-w-[1000px] my-5" />
        <h1 className="text-[1rem] md:text-[2rem] lg:text-[3rem] text-center mt-3 text-[#75a3e3]">
          {title}
        </h1>
        <h3 className="text-[0.7rem] md:text-[1rem] text-center mb-3 text-white bg-black/30 rounded-md py-[2px] px-2 ">
          {categoryName}
        </h3>
        <div className="flex justify-between space-x-5 w-[90%] max-w-[1000px] mt-4">
          <div className="flex items-center">
            {isDicebearImage ? (
              <img
                className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 border-[.5px] border-gray"
                src={userImage}
              />
            ) : (
              (
                <Avatar
                  alt={`${randomFirstName} ${randomLastName}`}
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: { xs: "20px", md: "32px" },
                    height: { xs: "20px", md: "32px" },
                    mr: 1,
                    backgroundColor: "#B9D0F0",
                  }}
                />
              ) || (
                <Avatar
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: { xs: "20px", md: "32px" },
                    height: { xs: "20px", md: "32px" },
                    mr: 1,
                    backgroundColor: "#B9D0F0",
                  }}
                />
              )
            )}
            <div className="text-[10px] md:text-[16px]">
              <p className="text-gray-900 leading-none">{`${randomFirstName} ${randomLastName}`}</p>
              <p className="text-gray-600 space-x-1">
                <span>{dateFormatter(createdAt)} -</span>
                <span>{`${calculateReadTime(content)} min read`}</span>
              </p>
            </div>
          </div>
          <div className="flex space-x-1 md:space-x-4">
            <BlogAnalytics
              likes={likes}
              comments={comments}
              countOfVisitors={countOfVisitors}
              _id={id}
              userId={userId}
            />
          </div>
        </div>
        <p className="w-[90%] max-w-[1000px] my-5 text-[12px] md:text-[1rem] lg:text-[1.2rem]">
          {content}
        </p>
      </div>
      {/* {show && <CommentForm comments={comments} id={id || ""} />} */}
      {/* {currentUser?._id == userId && (
        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          gap={5}
        >
          <UpdateModal blog={blog} />
          <DeleteModal blog={blog} />
        </Box>
      )} */}
    </div>
  );
};

export default Detail;
