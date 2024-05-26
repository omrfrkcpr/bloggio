/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../app/store";
import BlogCard from "../components/Cards/BlogCard";

const Category = () => {
  const { state } = useLocation();
  const { blogs, categories } = useSelector((state: RootState) => state.blog);
  // console.log(state._id);

  const findCategoryName = (array: Array<string>, id: string) => {
    const category = array.find((cat: any) => cat?._id === id) as
      | { name: string }
      | undefined;
    return category ? category?.name : "";
  };

  const categoryName = findCategoryName(categories, state?._id);

  return (
    <div className="max-w-[900px] mx-auto min-h-[88.4vh] h-auto p-5">
      <div className="text-center text-4xl text-gray-500 my-[3rem]">
        <h2>
          Category:{" "}
          <span className="font-bold text-black/80 underline">
            {categoryName}
          </span>
        </h2>
      </div>
      <ul className="grid grid-cols-1 gap-y-16 gap-x-6 items-start justify-center ">
        {blogs
          .filter((item: any) => item?.categoryId === state?._id)
          .map((blog: any) => {
            return (
              <div key={blog?._id}>
                <BlogCard {...blog} categoryName={categoryName} />
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default Category;
