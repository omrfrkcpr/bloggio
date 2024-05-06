/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect } from "react";
import { discoverActions } from "../helper/constants";
import { Link } from "react-router-dom";

const Discover = () => {
  const { categories } = useSelector((state: any) => state.blog);
  const { getBlogData } = useBlogCalls();
  const [displayedCategories, setDisplayedCategories] = useState<number>(5);

  useEffect(() => {
    getBlogData("categories");
  }, []);

  const loadMoreCategories = () => {
    setDisplayedCategories((prevCount) => prevCount + 5);
  };

  return (
    <div className="sticky top-[6rem]">
      <div className="border-b border-gray-400 pb-7">
        <h2 className="font-semibold">
          Discover more of what are important to you.
        </h2>
        <div className="my-2 flex items-center gap-3 flex-wrap">
          {categories
            .slice(0, displayedCategories)
            .map(({ _id, name }: { _id: string; name: string }) => (
              <button
                key={_id}
                className="bg-gray-300 text-gray-600 hover:text-black  px-3 py-2 rounded-full"
              >
                {name}
              </button>
            ))}
          {categories.length > displayedCategories && (
            <button
              onClick={loadMoreCategories}
              className="text-black text-sm py-3 underline hover:text-blue-400"
            >
              See more topics
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-3 leading-3 pt-8">
        {discoverActions.map(
          ({
            id,
            label,
            path,
          }: {
            id: number;
            label: string;
            path: string;
          }) => (
            <Link to={path} key={id}>
              <button>{label}</button>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Discover;
