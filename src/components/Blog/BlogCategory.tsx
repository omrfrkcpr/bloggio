import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface BlogCategoryProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const BlogCategory: React.FC<BlogCategoryProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { categories } = useSelector(
    (state: RootState) => state.blog
  ) as BlogState;
  return (
    <div className="flex gap-4">
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
        }}
        name="categories"
        id="categories"
        className="border border-gray-400 p-1"
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories?.map((category: Category) => (
          <option key={category?._id} value={category?._id}>
            {category?.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BlogCategory;
