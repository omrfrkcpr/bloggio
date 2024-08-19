import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { axiosWithPublic } from "../hooks/useAxios";
import { ClipLoader } from "react-spinners";
import CustomImage from "../utils/CustomImage";
import setups from "../helper/setup";

interface Statistics {
  totalBlogs: number;
  publishedBlogs: number;
  unpublishedBlogs: number;
  totalLikes: number;
  totalVisitors: number;
  totalComments: number;
  totalCommentLikes: number;
  mostPopularBlog: BlogCardProps;
  latestBlog: BlogCardProps;
}

interface StatValues {
  id: number;
  color: string;
  label: string;
  value: number;
}

interface StatisticCardProps {
  blog: BlogCardProps;
  badge: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ blog, badge }) => {
  const { _id, title, image, tags, blogDetails, updatedAt, countOfVisitors } =
    blog;

  return (
    <div className="relative overflow-hidden shadow-lg rounded-lg w-[360px] h-[520px] cursor-pointer m-auto">
      <div className="absolute top-0 left-0 z-50 w-full">
        <CustomImage
          alt="badge"
          src={`${setups.AWS_S3_BASE_URL}${badge}`}
          className={`${
            badge === "rosette-latest-blog.png" ? "w-[130px]" : "w-[150px]"
          } h-auto object-cover`}
        />
      </div>
      <a href={`/blog/${_id}`} className="w-full block h-full">
        <CustomImage
          alt="blog photo"
          src={image}
          className="h-[200px] w-[360px] object-fit"
        />
        <div className="bg-white w-full p-4">
          <p className="text-indigo-500 text-2xl font-medium">{title}</p>
          <p className="text-gray-600 font-light text-md">
            {blogDetails.contentPrev}{" "}
            <a
              className="inline-flex text-indigo-500 hover:underline"
              href={`/blog/${_id}`}
            >
              Read More
            </a>
          </p>
          <div className="absolute bottom-[85px] flex flex-wrap justify-start items-center text-xs text-white font-medium">
            {tags.map((tag: string, i: number) => (
              <span key={i} className="m-1 px-2 py-1 rounded bg-[#98b9e9]">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center mt-2 absolute bottom-2 border-t-2 py-3 justify-between text-center">
            <div className="pl-3 text-left">
              <div className="font-medium">Published</div>
              <div className="text-gray-600 text-sm">{updatedAt}</div>
            </div>
            <div className="pl-3">
              <div className="font-medium">Likes</div>
              <div className="text-gray-600 text-sm">
                {blogDetails.countOfLikes}
              </div>
            </div>
            <div className="pl-3">
              <div className="font-medium">Comments</div>
              <div className="text-gray-600 text-sm">
                {blogDetails.countOfComments}
              </div>
            </div>
            <div className="pl-3">
              <div className="font-medium">Visitors</div>
              <div className="text-gray-600 text-sm">{countOfVisitors}</div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const Statistics: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [userStatistics, setUserStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<string>("All time");

  const getUserStatistics = async () => {
    setLoading(true);
    try {
      const { data } = await axiosWithPublic.post(
        `users/${currentUser?._id}/statistics`,
        { timeRange }
      );
      setUserStatistics(data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(
        error?.response?.data?.error ||
          "Something went wrong. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      getUserStatistics();
    }
  }, [currentUser?._id, timeRange]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(event.target.value);
  };

  const blogData: StatValues[] = userStatistics
    ? [
        {
          id: 1,
          label: "Published Blogs",
          value: userStatistics.publishedBlogs,
          color: "green",
        },
        {
          id: 2,
          label: "Draft Blogs",
          value: userStatistics.unpublishedBlogs,
          color: "orange",
        },
      ]
    : [];

  const xAxisDataBlog = ["Total Blogs", "Total Likes", "Total Visitors"];
  const seriesDataBlog = userStatistics
    ? [
        {
          id: "1",
          label: "Total Blogs",
          data: [userStatistics.totalBlogs, 0, 0],
          color: "#cd2e2e",
        },
        {
          id: "2",
          label: "Total Likes",
          data: [0, userStatistics.totalLikes, 0],
          color: "#2196F3",
        },
        {
          id: "3",
          label: "Total Visitors",
          data: [0, 0, userStatistics.totalVisitors],
          color: "#FFC107",
        },
      ]
    : [];

  const xAxisDataComment = ["Total Comment", "Total Comment Likes"];
  const seriesDataComment = userStatistics
    ? [
        {
          id: "1",
          label: "Total Comments",
          data: [userStatistics.totalComments, 0],
          color: "#22ffe5",
        },
        {
          id: "2",
          label: "Total Comment Likes",
          data: [0, userStatistics.totalCommentLikes],
          color: "#9C27B0",
        },
      ]
    : [];

  const blogCards = userStatistics
    ? [
        {
          blog: userStatistics.latestBlog,
          badge: "rosette-latest-blog.png",
        },
        {
          blog: userStatistics.mostPopularBlog,
          badge: "rosette-best.png",
        },
      ]
    : [];

  return (
    <div className="page-height w-full relative">
      {loading ? (
        <div className="absolute flex flex-col items-center justify-center h-full w-full">
          <ClipLoader size={60} color="#B9D0F0" loading={loading} />
          <p className="mt-4 text-lg md:text-xl">Fetching Statistics...</p>
        </div>
      ) : (
        <>
          <div className="h-fit absolute top-5 right-[120px]">
            <select
              name="timeRange"
              id="timeRange"
              value={timeRange}
              onChange={handleChange}
              className="border border-gray-400 py-1 px-2 focus:outline-none"
            >
              <option value="All time">All Time</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Last 1 Year">Last 1 Year</option>
            </select>
          </div>
          <div className="py-20 px-10 flex flex-col text-center 2xl:text-left 2xl:flex-row w-full justify-center gap-6">
            {blogCards.length > 0 && (
              <div className="flex justify-center flex-wrap gap-6 items-start text-left">
                {blogCards.map((card, index) => (
                  <StatisticCard key={index} {...card} />
                ))}
              </div>
            )}
            <div className="flex flex-col justify-start items-center gap-3 py-4 px-1">
              <h3 className="text-xl font-semibold border-b-2 border-black">
                Blog Statistics
              </h3>
              <div className="relative w-[400px] md:w-[500px] lg:w-[600px] h-[300px] md:h-[400px]">
                <BarChart
                  xAxis={[{ scaleType: "band", data: xAxisDataBlog }]}
                  series={seriesDataBlog}
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div className="relative w-[400px] md:w-[500px] h-[150px] md:h-[200px] lg:h-[250px] mt-4">
                <PieChart
                  series={[
                    {
                      data: blogData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-3 py-4 px-1 h-fit">
              <h3 className="text-xl font-semibold border-b-2 border-black">
                Comment Statistics
              </h3>
              <div className="relative w-auto md:w-[600px] 2xl:w-[450px] h-[250px] md:h-[400px]">
                <BarChart
                  xAxis={[{ scaleType: "band", data: xAxisDataComment }]}
                  series={seriesDataComment}
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
