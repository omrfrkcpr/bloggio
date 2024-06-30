/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import BlogCard from "../components/Cards/BlogCard";
import { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import {
  findCategoryId,
  findCategoryName,
  getCapitalizedFilterValue,
} from "../helper/functions";
import CustomButton from "../utils/CustomButton";
import News from "../layouts/News";

const FilterCategory = () => {
  const { blogs, categories } = useSelector((state: RootState) => state.blog);
  const { getBlogData } = useBlogCalls();
  const { search } = useLocation();
  const [displayCount, setDisplayCount] = useState<number>(3);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // console.log(search);

  useEffect(() => {
    setSelectedCategory(
      findCategoryId(categories, getCapitalizedFilterValue(search))
    );
  }, [search, categories]);

  useEffect(() => {
    getBlogData("categories");
  }, []);

  const categoryName = findCategoryName(categories, selectedCategory);

  useEffect(() => {
    getBlogData(
      "blogs",
      `?filter[categoryId]=${
        selectedCategory ||
        findCategoryId(categories, getCapitalizedFilterValue(search))
      }`
    );
    if (selectedCategory && !search.includes(categoryName.toLowerCase())) {
      navigate(`/categories?filter=${categoryName.toLowerCase()}`);
    }
    setDisplayCount(3); // Reset display count when category changes;
  }, [selectedCategory]);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="max-w-[1600px] mx-auto min-h-[88.4vh] h-auto p-5 flex flex-col items-center">
      <div className="text-center text-4xl text-gray-500 my-[3rem] flex justify-center gap-2">
        <h2>Category:</h2>
        <select
          name="allCategories"
          id="allCategories"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-lg border text-black border-gray-700 rounded-full px-2"
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((item: any) => (
            <option key={item?._id} value={item?._id}>
              {item?.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center gap-6">
        {blogs.length ? (
          <>
            <ul
              className={`grid grid-cols-1 gap-y-16 gap-x-6 items-start justify-center ${
                displayCount < blogs.length ? "mb-[80px]" : "mb-[300px]"
              }`}
            >
              {blogs.slice(0, displayCount).map((blog: any) => {
                return (
                  <div key={blog?._id}>
                    <BlogCard
                      {...blog}
                      categoryName={
                        findCategoryName(categories, blog?.categoryId) ||
                        categoryName
                      }
                    />
                  </div>
                );
              })}
              {displayCount < blogs.length && (
                <CustomButton
                  click={handleShowMore}
                  className="text-sm border text-black border-gray-500 hover:bg-gray-100 rounded-full px-2 py-1 xl:px-4 xl:py-2 mt-4 w-[100px] xl:w-[130px] text-center mx-auto"
                  title="Show More"
                />
              )}
            </ul>
          </>
        ) : (
          <div className="text-center text-2xl text-gray-500 my-[3rem]">
            <h2>No blog found in this category.</h2>
          </div>
        )}
        <div className="w-0 lg:w-[350px] xl:w-[400px] hidden md:block border-l border-gray-400 ps-4">
          <News categoryName={categoryName.toLowerCase()} />
        </div>
      </div>
    </div>
  );
};

export default FilterCategory;
