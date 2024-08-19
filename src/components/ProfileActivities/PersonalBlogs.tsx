/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import BlogCard from "../Cards/BlogCard";
import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useBlogCalls from "../../hooks/useBlogCalls";

const PersonalBlogs = ({ blogType }: { blogType: string }) => {
  const { blogs, totalPage, saved } = useSelector(
    (state: RootState) => state.blog
  );
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { getBlogData, getSavedBlogs } = useBlogCalls();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [type, setType] = useState<string>(blogType || "");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // console.log(pathname);
  // console.log(search);

  // console.log(blogs);
  // console.log(currentUser)

  useEffect(() => {
    if (search.includes("my-blogs")) {
      setType("myBlogs");
      getBlogData(
        "blogs",
        `?filter[userId]=${currentUser?._id}&filter[isPublish]=true&sort[createdAt]=desc&page=${currentPage}&limit=${itemsPerPage}`
      );
    }
    if (search.includes("drafts")) {
      setType("drafts");
      getBlogData(
        "blogs",
        `?filter[userId]=${currentUser?._id}&filter[isPublish]=false&sort[createdAt]=desc&page=${currentPage}&limit=${itemsPerPage}`
      );
    }
    if (search.includes("saved")) {
      setType("saved");
      getSavedBlogs(currentUser?._id || "");
    }
  }, [search]);

  const onPageChange = async (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    navigate(
      `/profile/${currentUser?._id}?${type}&page=${page}&limit=${itemsPerPage}`
    );
  };

  // console.log(saved);

  const selectedBlogs =
    search?.includes("my-blogs") || search?.includes("drafts") ? blogs : saved;

  return (
    <>
      {selectedBlogs?.length ? (
        <div className=" min-h-[43.8vh]">
          <ul className="grid grid-cols-1 gap-y-[3rem] items-start justify-center max-w-[900px] h-auto">
            {selectedBlogs.map((blog: BlogCardProps) => {
              return <BlogCard key={blog?._id} {...blog} />;
            })}
          </ul>
          {selectedBlogs.length && totalPage > 1 ? (
            <Stack
              sx={{
                margin: "5rem 0",
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
