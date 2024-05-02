/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect, useState } from "react";
import BlogCard from "../components/Cards/BlogCard";

const Blogs = () => {
  const { getBlogData } = useBlogCalls();
  const { blogs } = useSelector((state: any) => state.bloggio);
  // const [initialState, setInitialState] = useState({
  //   _id: "",
  //   userId: "",
  //   categoryId: "",
  //   title: "",
  //   content: "",
  //   image: "",
  //   comments: [],
  //   likes: [],
  //   countOfVisitors: 0,
  // });

  console.log("blogs:", blogs);

  useEffect(() => {
    getBlogData("blogs");
  }, [getBlogData]);

  return (
    <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
      {blogs.map((blog: object) => {
        return (
          <div>
            <BlogCard {...blog} />
          </div>
        );
      })}
    </ul>
  );
};

export default Blogs;
