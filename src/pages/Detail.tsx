/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useBlogCalls from "../hooks/useBlogCalls";
import { useParams } from "react-router-dom";
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
  const [show, setShow] = useState(false);

  useEffect(() => {
    getBlogDetails(`blogs/${id}`);
  }, []);

  const {
    // userId,
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
        <img src={image} alt={title} />
        <BlogAnalytics
          show={show}
          setShow={setShow}
          likes={likes}
          comments={comments}
          countOfVisitors={countOfVisitors}
        />
      </div>
      {show && <CommentForm comments={comments} id={id || ""} />}
    </>
  );
};

export default Detail;
