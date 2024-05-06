/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { RootState } from "../app/store";
import BlogCard from "../components/Cards/BlogCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const BlogsPerPage = 5;

const Blogs = () => {
  const { getBlogData } = useBlogCalls();
  const { blogs, categories } = useSelector((state: RootState) => state.blog);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const indexOfLastBlog = currentPage * BlogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - BlogsPerPage;
  const currentBlogs = blogs?.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs?.length / BlogsPerPage);

  const onPageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getBlogData("blogs");
    getBlogData("categories");
  }, []);

  console.log("blogs:", blogs);
  console.log("categories:", categories);

  return (
    <>
      <ul className="grid grid-cols-1 gap-y-10 gap-x-6 items-start justify-center p-8 max-w-[900px] mx-auto min-h-[43.8vh] h-auto">
        {currentBlogs.map((blog: any) => {
          const category = categories.find(
            (cat: any) => cat?._id === blog?.categoryId
          ) as { name: string } | undefined;
          const categoryName = category ? category?.name : "";
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
