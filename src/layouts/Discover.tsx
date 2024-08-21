/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../utils/CustomButton";
import News from "./News";
import { RootState } from "../app/store";
import { replaceSpacesAndUnderscores } from "../helpers/functions";
import { resetBlogs } from "../features/blogSlice";
// import { Link } from "react-router-dom";

const Discover = () => {
  const { categories } = useSelector(
    (state: RootState) => state.category
  ) as CategoryState;
  const { blogs } = useSelector((state: RootState) => state.blog) as BlogState;
  const [displayedCategories, setDisplayedCategories] = useState<number>(5);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(categories);

  const loadMoreCategories = () => {
    setDisplayedCategories((prevCount) => prevCount + 5);
  };

  const handleNavigateClick = (name: string) => {
    // Find the category that matches the name
    const matchedCategory = categories.find(
      (category) => category.name.toLowerCase() === name.toLowerCase()
    );

    // Extract the _id of the first subcategory if it exists
    const subCategoryId = matchedCategory?.subcategories?.[0];

    // Reset the blogs state before navigating to a new category
    dispatch(resetBlogs());

    // Navigate to the desired route
    navigate(
      `/categories?filter=${replaceSpacesAndUnderscores({
        str: name.toLowerCase(),
      })}`,
      { state: { subCategory: subCategoryId } }
    );
  };

  return (
    <div className="sticky top-[1rem] md:top-[3rem] lg:top-[6rem]">
      <div className="border-b border-gray-400 pb-3 md:pb-5 lg:pb-7 mb-6">
        <h2 className="font-semibold text-[10px] md:text-[14px] lg:text-[16px] mb-4">
          Discover more of what are important to you.
        </h2>
        <div className="my-1 md:my-2 flex items-center gap-1 md:gap-3 flex-wrap">
          {categories
            .slice(0, displayedCategories)
            .map(({ _id, name }: { _id: string; name: string }) => (
              <CustomButton
                click={() => handleNavigateClick(name)}
                key={_id}
                className="bg-gray-300 text-gray-600 text-[10px] md:text-[12px] lg:text-[14px] hover:text-black px-2 md:px-3 py-1 md:py-2 rounded-full"
                title={name}
              />
            ))}
          {categories.length > displayedCategories && (
            <CustomButton
              click={loadMoreCategories}
              className="text-black text-[10px] md:text-[12px] lg:text-[14px] py-3 underline hover:text-gray-600"
              title="See more topics"
            />
          )}
        </div>
      </div>
      <News categoryName="software" show={blogs.length > 0} />
    </div>
  );
};

export default Discover;
