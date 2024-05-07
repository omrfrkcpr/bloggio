/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

const Discover = () => {
  const { categories } = useSelector((state: any) => state.blog);
  const [displayedCategories, setDisplayedCategories] = useState<number>(5);

  console.log(categories);

  const loadMoreCategories = () => {
    setDisplayedCategories((prevCount) => prevCount + 5);
  };

  return (
    <div className="sticky top-[1rem] md:top-[3rem] lg:top-[6rem]">
      <div className="border-b border-gray-400 pb-3 md:pb-5 lg:pb-7">
        <h2 className="font-semibold text-[10px] md:text-[14px] lg:text-[18px]">
          Discover more of what are important to you.
        </h2>
        <div className="my-1 md:my-2 flex items-center gap-1 md:gap-3 flex-wrap">
          {categories
            .slice(0, displayedCategories)
            .map(({ _id, name }: { _id: string; name: string }) => (
              <button
                key={_id}
                className="bg-gray-300 text-gray-600 text-[10px] md:text-[12px] lg:text-[14px] hover:text-black px-2 md:px-3 py-1 md:py-2 rounded-full"
              >
                {name}
              </button>
            ))}
          {categories.length > displayedCategories && (
            <button
              onClick={loadMoreCategories}
              className="text-black text-[10px] md:text-[12px] lg:text-[14px] py-3 underline hover:text-blue-400"
            >
              See more topics
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
