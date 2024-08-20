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

  // selectedSubcategory'ye bağlı category'yi bulma ve set etme
  useEffect(() => {
    if (selectedSubcategory) {
      const foundCategory = categories.find((category) =>
        category.subcategories?.some(
          (subcategory) => subcategory._id === selectedSubcategory
        )
      );
      if (foundCategory) {
        setSelectedCategory(foundCategory._id);
      }
    }
  }, [selectedSubcategory, categories]);

  const currentCategory = categories.find(
    (category) => category._id === selectedCategory
  );

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Ana kategori seçimi */}
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        name="categories"
        id="categories"
        className="border border-gray-400 p-2 text-[18px]"
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

      {/* Alt kategori seçimi */}
      {selectedCategory && currentCategory?.subcategories?.length && (
        <select
          value={selectedSubcategory}
          onChange={(e) => handleSubcategoryChange(e.target.value)}
          name="subcategories"
          id="subcategories"
          className="border border-gray-400 p-2 text-[18px]"
        >
          <option value="" disabled>
            Select Subcategory
          </option>
          {currentCategory?.subcategories?.map((subcategory: SubCategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default BlogCategory;
