/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useBlogCalls from "../hooks/useBlogCalls";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogAnalytics from "../components/commons/BlogAnalytics";
import CommentForm from "../components/Forms/CommentForm";

const Detail = () => {
  const { currentUser } = useSelector((state: RootState) => state?.auth);
  const { getBlogDetails } = useBlogCalls();
  const { blogDetails } = useSelector((state: any) => state?.blog);
  // console.log("Blog Detail:", blogDetails);
  const { id } = useParams();
  // console.log("Blog ID:", id);
  const location = useLocation();
  const { state } = location;
  const [show, setShow] = useState(false);

  useEffect(() => {
    getBlogDetails(`blogs/${id}`);
  }, []);

  const {
    randomFirstName = "",
    randomLastName = "",
    userImage = "",
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
    categoryName,
  } = blogDetails;

  return (
    <>
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
        <img src={userImage} alt={title} width="50px" />
        <h1>{`${randomFirstName} ${randomLastName}`}</h1>
        <BlogAnalytics
          show={show}
          setShow={setShow}
          likes={likes}
          comments={comments}
          countOfVisitors={countOfVisitors}
        />
      </div>
      {show && <CommentForm comments={comments} id={id || ""} />}
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
    </>
  );
};

export default Detail;
