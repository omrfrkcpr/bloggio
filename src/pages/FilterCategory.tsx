/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import BlogCard from "../components/Cards/BlogCard";
import { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { findCategoryName } from "../helper/functions";
import CustomButton from "../components/commons/CustomButton";

const FilterCategory = () => {
  const { state } = useLocation();
  const { blogs, categories } = useSelector((state: RootState) => state.blog);
  const { getBlogData } = useBlogCalls();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    state?._id || ""
  );
  const [displayCount, setDisplayCount] = useState<number>(3);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogData("categories");
  }, []);

  const categoryName = findCategoryName(categories, selectedCategory);

  useEffect(() => {
    getBlogData(
      "blogs",
      `?filter[categoryId]=${selectedCategory || state?._id}`
    );
    if (selectedCategory) {
      navigate(`/categories?filter=${categoryName.toLowerCase()}`, {
        state: { selectedCategory },
      });
    }
    setDisplayCount(3); // Reset display count when category changes;
  }, [selectedCategory]);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="max-w-[900px] mx-auto min-h-[88.4vh] h-auto p-5">
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
      {blogs.length ? (
        <>
          <ul className="grid grid-cols-1 gap-y-16 gap-x-6 items-start justify-center mb-[18rem]">
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
                className="text-sm border text-black border-gray-500 hover:bg-gray-100 rounded-full px-4 py-2 mt-4 w-[130px] text-center mx-auto"
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
    </div>
  );
};

export default FilterCategory;
