import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import BlogCard from "../components/Cards/BlogCard";
import { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import CustomButton from "../utils/CustomButton";
import News from "../layouts/News";
import BlogCategory from "../components/Blog/BlogCategory";
import { replaceSpacesAndUnderscores } from "../helpers/functions";
import CustomImage from "../utils/CustomImage";
import setups from "../helpers/setup";

const FilterCategory = () => {
  const { blogs, loading } = useSelector((state: RootState) => state.blog);
  const { categories } = useSelector(
    (state: RootState) => state.category
  ) as CategoryState;
  const { getBlogData } = useBlogCalls();
  const { search, state } = useLocation();
  const [displayCount, setDisplayCount] = useState<number>(3);
  const navigate = useNavigate();
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory>();
  const [selectedSubcategoryId, setSelectedSubcategoryId] =
    useState<string>("");

  // console.log(state.subCategoryId);

  useEffect(() => {
    setSelectedSubcategoryId(state?.subCategory?._id);
  }, [state]);

  useEffect(() => {
    if (categories.length) {
      let foundSubcategory;

      categories.forEach((category: Category) => {
        if (category.subcategories && category.subcategories.length) {
          const subcategoryMatch = category.subcategories.find(
            (subcategory: SubCategory) =>
              subcategory._id === selectedSubcategoryId
          );
          if (subcategoryMatch) {
            foundSubcategory = subcategoryMatch;
          }
        }
      });

      if (foundSubcategory) {
        setSelectedSubcategory(foundSubcategory);
      }
    }
  }, [categories, selectedSubcategoryId]);

  // console.log("selected category:", selectedCategory);
  // console.log("search:", getCapitalizedFilterValue(search));

  useEffect(() => {
    if (selectedSubcategory) {
      getBlogData("blogs", `?filter[categoryId]=${selectedSubcategory?._id}`);
      if (
        selectedSubcategory &&
        !search.includes(
          replaceSpacesAndUnderscores({
            str: selectedSubcategory?.name?.toLowerCase(),
          }) || ""
        )
      ) {
        navigate(
          `/categories?filter=${replaceSpacesAndUnderscores({
            str: selectedSubcategory?.name?.toLowerCase(),
          })}`
        );
      }
      setDisplayCount(3); // Reset display count when category changes;
    }
  }, [selectedSubcategory]);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="max-w-[1600px] mx-auto page-height px-4 md:py-5 md:px-10 flex flex-col items-center">
      <div className="text-center text-2xl md:text-3xl xl:text-4xl text-gray-500 my-[2rem] md:my-[3rem] flex flex-col justify-center gap-2">
        <h2>Category:</h2>
        <div className="bg-white p-2 md:p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-[250px] md:max-w-[300px]">
          <BlogCategory
            selectedSubcategory={selectedSubcategoryId}
            setSelectedSubcategory={setSelectedSubcategoryId}
          />
        </div>
      </div>
      <div className="flex justify-center gap-6">
        {loading ? (
          <div className="my-5 text-center">
            <CustomImage
              src={`${setups.AWS_S3_BASE_URL}spinner2.gif`}
              alt="news-spinner"
              className="w-[60px] h-[60px] m-auto text-center"
            />
          </div>
        ) : (
          <>
            {blogs.length ? (
              <>
                <ul
                  className={`grid grid-cols-1 gap-y-16 gap-x-6 items-start justify-center ${
                    displayCount < blogs.length ? "mb-[80px]" : "mb-[300px]"
                  }`}
                >
                  {blogs.slice(0, displayCount).map((blog: BlogCardProps) => {
                    return <BlogCard key={blog?._id} {...blog} />;
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
          </>
        )}
        <div className="w-0 lg:w-[350px] xl:w-[400px] hidden md:block border-0 lg:border-l lg:border-gray-400  ps-4">
          <News
            categoryName={selectedSubcategory?.name || ""}
            show={blogs.length > 0}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterCategory;
