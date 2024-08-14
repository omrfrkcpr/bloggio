/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import BlogCard from "../components/Cards/BlogCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import useBlogCalls from "../hooks/useBlogCalls";

export const BlogsPerPage = 10;

const Blogs = () => {
  const navigate = useNavigate();
  const { getBlogData } = useBlogCalls();
  const { blogs, totalPage } = useSelector((state: RootState) => state.blog);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const onPageChange = async (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    await navigate(`?sort[createdAt]=desc&page=${page}&limit=${BlogsPerPage}`);
    getBlogData(
      "blogs",
      `?sort[createdAt]=desc&page=${page}&limit=${BlogsPerPage}`
    );
  };

  // console.log(blogs);

  useEffect(() => {
    getBlogData("blogs", `?sort[createdAt]=desc&page=1&limit=${BlogsPerPage}`);
  }, []);

  return (
    <>
      <ul className="grid grid-cols-1 gap-y-10 gap-x-6 items-start justify-center max-w-[900px] min-h-[43.8vh] h-auto ">
        {blogs.slice(0, 10).map((blog: any) => {
          return (
            <div key={blog?._id}>
              <BlogCard {...blog} />
            </div>
          );
        })}
      </ul>
      <Stack
        sx={{
          margin: "2rem 0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Pagination
          count={totalPage}
          page={currentPage}
          color="primary"
          onChange={onPageChange}
        />
      </Stack>
    </>
  );
};

export default Blogs;
