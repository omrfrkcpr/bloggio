/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Trending = () => {
  const { blogs } = useSelector((state: RootState) => state.blog);

  const trendBlogs = blogs
    ?.slice()
    .sort((a: any, b: any) => b.countOfVisitors - a.countOfVisitors)
    .slice(0, 10);

  return (
    <div>
      <h2>Trending</h2>
      <ul>
        {trendBlogs.map((blog: any) => (
          <li key={blog?.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Trending;
