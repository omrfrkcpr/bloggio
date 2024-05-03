/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect, useState } from "react";
import { RootState } from "../app/store";
import BlogCard from "../components/Cards/BlogCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export const BlogsPerPage = 10;

const Blogs = () => {
  const navigate = useNavigate();
  const { getBlogData } = useBlogCalls();
  const { blogs } = useSelector((state: RootState) => state.blog);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [initialState, setInitialState] = useState({
    _id: "",
    userId: "",
    categoryId: "",
    title: "",
    content: "",
    image: "",
    comments: [],
    likes: [],
    countOfVisitors: 0,
  });

  const handleReadMore = (id: string) => {
    // console.log(id);
    navigate(`blog-details/${id}`);
  };

  const indexOfLastBlog = currentPage * BlogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - BlogsPerPage;
  const currentBlogs = blogs?.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs?.length / BlogsPerPage);

  const onPageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  console.log("blogs:", blogs);

  useEffect(() => {
    getBlogData("blogs");
  }, []);

  return (
    <>
      <ul className="grid grid-cols-1 gap-y-10 gap-x-6 items-start justify-center p-8 max-w-[900px] mx-auto">
        {currentBlogs.map((blog: any) => {
          return (
            <div key={blog._id}>
              <BlogCard {...blog} handleReadMore={handleReadMore} />
            </div>
          );
        })}
      </ul>
      <Stack
        sx={{
          marginTop: "2rem",
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          color="primary"
          onChange={onPageChange}
        />
      </Stack>
    </>
  );
};

export default Blogs;
