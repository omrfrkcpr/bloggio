import Hero from "../layouts/Hero";
import Blogs from "../layouts/Blogs";
import Trending from "../layouts/Trending";
import Discover from "../layouts/Discover";
import { useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";

const Home = () => {
  const { getBlogData } = useBlogCalls();

  useEffect(() => {
    getBlogData("blogs");
    getBlogData("categories");
  }, [getBlogData]);

  // console.log("blogs:", blogs);
  // console.log("categories:", categories);

  return (
    <div>
      <Hero />
      <Trending />
      <div className="size py-3 md:py-5 lg:py-7 flex flex-col-reverse lg:flex-row gap-[3rem]">
        <div className="flex-[1.5]">
          <Blogs />
        </div>
        <div className="flex-[0.5] relative">
          <Discover />
        </div>
      </div>
    </div>
  );
};

export default Home;
