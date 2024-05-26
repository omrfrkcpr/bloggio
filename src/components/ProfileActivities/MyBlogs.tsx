/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import BlogCard from "../Cards/BlogCard";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBlogCalls from "../../hooks/useBlogCalls";

const MyBlogs = () => {
  const { blogs, categories, totalPage } = useSelector(
    (state: RootState) => state.blog
  );
  const { currentUser } = useSelector((state: any) => state.auth);
  const { getBlogData } = useBlogCalls();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onPageChange = async (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    navigate(`/profile/${currentUser?._id}/?page=${page}&limit=10`);
    getBlogData("blogs", `/?page=${page}&limit=10`); // TODO : Fix this (it should be /blogs/${currentUser._id})
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-y-10 gap-x-6 items-start justify-center max-w-[900px] mx-auto min-h-[43.8vh] h-auto">
        {blogs
          .filter((blog: any) => blog?.userId === currentUser?._id)
          .filter((blog: any) => blog?.isPublished === "true")
          .map((blog: any) => {
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
          count={totalPage}
          page={currentPage}
          color="primary"
          onChange={onPageChange}
        />
      </Stack>
    </>
  );
};

export default MyBlogs;
