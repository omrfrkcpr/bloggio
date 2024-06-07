/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import BlogCard from "../Cards/BlogCard";
import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { extractProfileId } from "../../helper/functions";

const PersonalBlogs = ({ blogType }: { blogType: string }) => {
  const { blogs, categories } = useSelector((state: RootState) => state.blog);
  const { currentUser } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { search } = useLocation();
  const [user, setUser] = useState<string>("");
  const [type, setType] = useState<string>(blogType || "");

  console.log(pathname);
  console.log(search);

  useEffect(() => {
    if (search.includes("my-blogs")) {
      setType("myBlogs");
    } else if (search.includes("drafts")) {
      setType("drafts");
    }
  }, [search]);

  useEffect(() => {
    if (currentUser?._id) {
      setUser(currentUser?._id);
    } else {
      setUser(extractProfileId(pathname));
    }
  }, [currentUser, pathname]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Type filters blogs and shows drafted or published blogs. The only thing that differs between the 2 components.
  const filteredBlogs = blogs.filter(
    (item: any) =>
      item?.isPublish === (type === "myBlogs" ? true : false) &&
      item?.userId === user
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
          No {type === "myBlogs" ? "Published" : "Draft"} Blog Found...
        </div>
      )}
    </>
  );
};

export default PersonalBlogs;
