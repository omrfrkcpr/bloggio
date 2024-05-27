/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import BlogCard from "../components/Cards/BlogCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import useBlogCalls from "../hooks/useBlogCalls";
import { getCategoryName } from "../helper/functions";

export const BlogsPerPage = 10;

const Blogs = () => {
  const navigate = useNavigate();
  const { getBlogData } = useBlogCalls();
  const { blogs, categories, totalPage } = useSelector(
    (state: RootState) => state.blog
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const onPageChange = async (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    navigate(`/?page=${page}&limit=10`);
    getBlogData("blogs", `/?page=${page}&limit=10`);
  };

  useEffect(() => {
    getBlogData("blogs", `/?page=1&limit=10`);
  }, []);

  return (
    <>
      <ul className="grid grid-cols-1 gap-y-10 gap-x-6 items-start justify-center max-w-[900px] min-h-[43.8vh] h-auto">
        {blogs.map((blog: any) => {
          const categoryName = getCategoryName(blog?.categoryId, categories);
          return (
            <div key={blog?._id}>
              <BlogCard {...blog} categoryName={categoryName} />
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
