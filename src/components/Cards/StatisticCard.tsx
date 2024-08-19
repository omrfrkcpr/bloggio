import React from "react";
import CustomImage from "../../utils/CustomImage";
import setups from "../../helper/setup";

interface StatisticCardProps {
  blog: BlogCardProps;
  badge: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ blog, badge }) => {
  return (
    <div className="relative overflow-hidden shadow-lg rounded-lg w-[300px] xl:w-[340px] 2xl:w-[360px] h-[360px] xl:h-[480px] 2xl:h-[520px] cursor-pointer m-auto">
      <div className="absolute top-0 left-0 z-10 w-full">
        <CustomImage
          alt="badge"
          src={`${setups.AWS_S3_BASE_URL}${badge}`}
          className={`${
            badge === "rosette-latest-blog.png"
              ? "w-[60px] xl:w-[90px]"
              : "w-[120px] xl:w-[150px]"
          } h-auto object-cover`}
        />
      </div>
      <a href={`/blog/${blog?._id}`} className="w-full block h-full">
        <CustomImage
          alt="blog photo"
          src={blog?.image}
          className="h-[150px] xl:h-[200px] w-[360px] object-fit"
        />
        <div className="bg-white w-full px-2 xl:p-4 space-y-1">
          <p className="text-indigo-500 text-md xl:text-lg 2xl:text-2xl font-medium">
            {blog?.title}
          </p>
          <p className="text-gray-600 font-light text-xs xl:text-sm 2xl:text-md">
            {blog?.blogDetails.contentPrev}{" "}
            <a
              className="inline-flex text-indigo-500 hover:underline"
              href={`/blog/${blog?._id}`}
            >
              Read More
            </a>
          </p>
          <div className="absolute bottom-[50px] xl:bottom-[60px] flex flex-wrap justify-start items-center text-[10px] xl:text-xs 2xl:text-sm text-white font-medium">
            {blog?.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="m-1 px-1 xl:px-2 py-[2px] xl:py-1 rounded bg-[#98b9e9]"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center mt-2 absolute bottom-1 xl:bottom-2 border-t-2 py-1 justify-between text-center w-[280px] xl:w-[300px] 2xl:w-[320px]">
            <div className="pl-1 xl:pl-3 text-left">
              <div className="font-medium text-sm xl:text-md">Published</div>
              <div className="text-gray-600 text-xs xl:text-sm">
                {blog?.updatedAt}
              </div>
            </div>
            <div className="pl-1 xl:pl-3">
              <div className="font-medium text-sm xl:text-md">Likes</div>
              <div className="text-gray-600 text-xs xl:text-sm">
                {blog?.blogDetails?.countOfLikes}
              </div>
            </div>
            <div className="pl-1 xl:pl-3">
              <div className="font-medium text-sm xl:text-md">Comments</div>
              <div className="text-gray-600 text-xs xl:text-sm">
                {blog?.blogDetails?.countOfComments}
              </div>
            </div>
            <div className="pl-3">
              <div className="font-medium text-sm xl:text-md">Visitors</div>
              <div className="text-gray-600 text-xs xl:text-sm">
                {blog?.countOfVisitors}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default StatisticCard;
