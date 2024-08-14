/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import BlogCard from "../Cards/BlogCard";
import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PersonalBlogs = ({ blogType }: { blogType: string }) => {
  const { blogs, categories } = useSelector((state: RootState) => state.blog);
  const { currentUser } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const { search } = useLocation();
  const [type, setType] = useState<string>(blogType || "");

  // console.log(pathname);
  // console.log(search);

  // console.log(blogs);
  // console.log(currentUser);

  useEffect(() => {
    if (search.includes("my-blogs")) {
      setType("myBlogs");
    } else if (search.includes("drafts")) {
      setType("drafts");
    } else if (search.includes("saved")) {
      setType("saved");
    }
  }, [search]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Type filters blogs and shows drafted or published blogs. The only thing that differs between the 2 components.
  const filteredBlogs = blogs.filter((item: any) => {
    if (type === "saved") {
      // Check if the current blog is in the user's saved blogs
      return currentUser.saved.includes(item._id);
    } else if (type === "myBlogs") {
      // Only include published blogs for "myBlogs"
      return item.isPublish === true && item.userId._id === currentUser._id;
    } else if (type === "drafts") {
      // Only include drafts for "drafts"
      return item.isPublish === false && item.userId._id === currentUser._id;
    }
    return false;
  });

  console.log(`Filtered Blogs for ${type}:`, filteredBlogs);

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

  return (
    <>
      {currentBlogs.length ? (
        <div className=" min-h-[43.8vh]">
          <ul className="grid grid-cols-1 gap-y-[3rem] items-start justify-center max-w-[900px] h-auto">
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
          {currentBlogs.length ? (
            <Stack
              sx={{
                margin: "5rem 0",
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
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="p-5 bg-gray-200 h-[30px] grid place-content-center place-items-center rounded-xl">
          No{" "}
          {type === "myBlogs"
            ? "Published"
            : type === "drafts"
            ? "Draft"
            : "Saved"}{" "}
          Blog Found...
        </div>
      )}
    </>
  );
};

export default PersonalBlogs;
