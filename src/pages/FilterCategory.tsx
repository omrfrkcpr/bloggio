/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import BlogCard from "../components/Cards/BlogCard";
import { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { getCapitalizedFilterValue } from "../helper/functions";
import CustomButton from "../utils/CustomButton";
import News from "../layouts/News";
// import useNewsCalls from "../hooks/useNewsCalls";

const FilterCategory = () => {
  const { blogs } = useSelector((state: RootState) => state.blog);
  const { categories } = useSelector(
    (state: RootState) => state.category
  ) as CategoryState;
  const { getBlogData } = useBlogCalls();
  // const { getNewsData } = useNewsCalls();
  const { search } = useLocation();
  const [displayCount, setDisplayCount] = useState<number>(3);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  // console.log(search);

  // console.log("selected category:", selectedCategory);

  // console.log("categories:", categories);
  // console.log("search:", getCapitalizedFilterValue(search));

  useEffect(() => {
    if (categories.length) {
      const filteredCategory = categories.find(
        (category: Category) =>
          category.name.toLowerCase() ===
          getCapitalizedFilterValue(search).toLowerCase()
      );
      setSelectedCategory(filteredCategory);
    }
  }, [search, categories]);

  useEffect(() => {
    // getNewsData(name || "", 1);
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selected = categories.find(
      (item: Category) => item._id === selectedId
    );
    setSelectedCategory(selected);
  };

  useEffect(() => {
    if (selectedCategory?._id) {
      getBlogData("blogs", `?filter[categoryId]=${selectedCategory?._id}`);
      if (
        selectedCategory &&
        !search.includes(selectedCategory?.name?.toLowerCase() || "")
      ) {
        navigate(`/categories?filter=${selectedCategory?.name?.toLowerCase()}`);
      }
      setDisplayCount(3); // Reset display count when category changes;
    }
  }, [selectedCategory]);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="max-w-[1600px] mx-auto page-height p-5 flex flex-col items-center">
      <div className="text-center text-4xl text-gray-500 my-[3rem] flex justify-center gap-2">
        <h2>Category:</h2>
        <select
          name="allCategories"
          id="allCategories"
          value={selectedCategory?._id}
          onChange={handleCategoryChange}
          className="text-lg border text-black border-gray-700 rounded-full px-2"
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((item: Category) => (
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
              {blogs.slice(0, displayCount).map((blog: BlogCardProps) => {
                return (
                  <div key={blog?._id}>
                    <BlogCard {...blog} />
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
          <News categoryName={selectedCategory?.name || ""} />
        </div>
      </div>
    </div>
  );
};

export default FilterCategory;
