import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface BlogCategoryProps {
  selectedSubcategory: string;
  setSelectedSubcategory: React.Dispatch<React.SetStateAction<string>>;
}

const BlogCategory: React.FC<BlogCategoryProps> = ({
  selectedSubcategory,
  setSelectedSubcategory,
}) => {
  const { categories } = useSelector(
    (state: RootState) => state.category
  ) as CategoryState;
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentView, setCurrentView] = useState<"main" | "sub">("main");
  const currentCategory = categories.find(
    (category) => category._id === selectedCategory
  );

  useEffect(() => {
    if (selectedCategory) {
      setCurrentView("sub");
    } else {
      setCurrentView("main");
    }
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
    setCurrentView("sub");
  };

  const handleSubcategoryChange = (subcategory: SubCategory) => {
    setSelectedSubcategory(subcategory._id);
  };

  const handleBack = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setCurrentView("main");
  };

  return (
    <div className="flex flex-col gap-4">
      {currentView === "sub" && (
        <button onClick={handleBack} className="mb-4 text-blue-500">
          Geri
        </button>
      )}

      {currentView === "main" ? (
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          name="categories"
          id="categories"
          className="border border-gray-400 p-2"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category: Category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      ) : (
        <div>
          <h2 className="text-xl mb-2">Select a Subcategory</h2>
          {currentCategory?.subcategories?.map((subcategory, index) => (
            <button
              key={index}
              onClick={() => handleSubcategoryChange(subcategory)}
              className={`block text-blue-500 mb-2 ${
                selectedSubcategory === subcategory._id ? "font-bold" : ""
              }`}
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogCategory;
