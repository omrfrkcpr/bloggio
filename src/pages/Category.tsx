/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../app/store";
import BlogCard from "../components/Cards/BlogCard";
import { useEffect, useState } from "react";

const Category = () => {
  const { state } = useLocation();
  const { blogs, categories } = useSelector(
    (state: RootState) => state.blog
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // console.log(state._id);

  useEffect(() => {
    if (state._id) {
      setSelectedCategory(state._id);
    }
  }, []);

  const findCategoryName = (array: Array<string>, id: string) => {
    const category = array.find((cat: any) => cat?._id === id) as
      | { name: string }
      | undefined;
    return category ? category?.name : "";
  };

  const categoryName = findCategoryName(categories, selectedCategory);
  const filteredBlogs = blogs.filter(
    (item: any) => item?.categoryId === selectedCategory
  );

  return (
    <>
      <div className="max-w-[900px] mx-auto min-h-[88.4vh] h-auto p-5">
        <div className="text-center text-4xl text-gray-500 my-[3rem] flex justify-center gap-5">
          <h2>
            Category:{" "}
            <span className="font-bold text-black/80 underline">
              {categoryName}
            </span>
          </h2>
          <select
            name="allCategories"
            id="allCategories"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-sm border border-gray-700 rounded-full px-2"
          >
            <option value="">Select another category</option>
            {categories.map((item: any) => (
              <option key={item?._id} value={item?._id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        {filteredBlogs.length ? (
          <ul className="grid grid-cols-1 gap-y-16 gap-x-6 items-start justify-center ">
            {filteredBlogs.map((blog: any) => {
              return (
                <div key={blog?._id}>
                  <BlogCard {...blog} categoryName={categoryName} />
                </div>
              );
            })}
          </ul>
        ) : (
          <div className="text-center text-2xl text-gray-500 my-[3rem]">
            <h2>No blog found in this category.</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
