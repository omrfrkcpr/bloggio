/* eslint-disable react-hooks/exhaustive-deps */
import Hero from "../layouts/Hero";
import Blogs from "../layouts/Blogs";
import Trending from "../layouts/Trending";
import Discover from "../layouts/Discover";
import { useEffect } from "react";
import useCategory from "../hooks/useCategory";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
// import useNewsCalls from "../hooks/useNewsCalls";

const Home = () => {
  const { getCategoryData } = useCategory();
  const { categories } = useSelector((state: RootState) => state.category);
  // const { getNewsData } = useNewsCalls();

  useEffect(() => {
    // getNewsData("software", 1);
  }, []);

  useEffect(() => {
    if (!categories.length) {
      getCategoryData();
    }
  }, []);

  return (
    <div>
      <Hero />
      <Trending />
      <div className="size py-3 md:py-5 lg:py-7 mb-[10rem] flex flex-col-reverse lg:flex-row gap-[2rem]">
        <div className="flex-[1.5] lg:border-r-[1px] lg:pe-4 lg:border-gray-300">
          <Blogs />
        </div>
        <div className="flex-[0.6] relative lg:max-w-[400px]">
          <Discover />
        </div>
      </div>
    </div>
  );
};

export default Home;
