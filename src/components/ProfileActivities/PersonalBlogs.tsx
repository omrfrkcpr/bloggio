/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import BlogCard from "../Cards/BlogCard";
import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBlogCalls from "../../hooks/useBlogCalls";

const PersonalBlogs = ({ blogType }: { blogType: string }) => {
  const { blogs, categories } = useSelector((state: RootState) => state.blog);
  const { currentUser } = useSelector((state: any) => state.auth);
  const { getBlogData } = useBlogCalls();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // BlogType filters blogs and shows drafted or published blogs. The only thing that differs between the 2 components.
  const filteredBlogs = blogs.filter(
    (item: any) =>
      item?.isPublish === (blogType === "myBlogs" ? true : false) &&
      item?.userId === currentUser?._id
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onPageChange = async (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    navigate(
      `/profile/${currentUser?._id}/?page=${page}&limit=${itemsPerPage}`
    );
  };

  useEffect(() => {
    getBlogData("blogs", `?author=${currentUser?._id}`);
  }, []);

  return (
    <>
      <ul className="grid grid-cols-1 gap-y-5 items-start justify-center max-w-[900px] min-h-[43.8vh] h-auto">
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

export default PersonalBlogs;
