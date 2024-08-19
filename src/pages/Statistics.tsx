import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { axiosWithPublic } from "../hooks/useAxios";
import { ClipLoader } from "react-spinners";
import StatisticCard from "../components/Cards/StatisticCard";

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

  const isValidData = (data: number) => typeof data === "number" && data > 0;

  const blogData: StatValues[] = [];
  if (userStatistics) {
    if (isValidData(userStatistics.publishedBlogs)) {
      blogData.push({
        id: 1,
        label: "Published Blogs",
        value: userStatistics.publishedBlogs,
        color: "green",
      });
    }
    if (isValidData(userStatistics.unpublishedBlogs)) {
      blogData.push({
        id: 2,
        label: "Draft Blogs",
        value: userStatistics.unpublishedBlogs,
        color: "orange",
      });
    }
  }

  const xAxisDataBlog = ["Total Blogs", "Total Likes", "Total Visitors"];
  const seriesDataBlog = [];
  if (userStatistics) {
    if (isValidData(userStatistics.totalBlogs)) {
      seriesDataBlog.push({
        id: "1",
        label: "Total Blogs",
        data: [userStatistics.totalBlogs, 0, 0],
        color: "#cd2e2e",
      });
    }
    if (isValidData(userStatistics.totalLikes)) {
      seriesDataBlog.push({
        id: "2",
        label: "Total Likes",
        data: [0, userStatistics.totalLikes, 0],
        color: "#2196F3",
      });
    }
    if (isValidData(userStatistics.totalVisitors)) {
      seriesDataBlog.push({
        id: "3",
        label: "Total Visitors",
        data: [0, 0, userStatistics.totalVisitors],
        color: "#FFC107",
      });
    }
  }

  const xAxisDataComment = ["Total Comment", "Total Comment Likes"];
  const seriesDataComment = [];
  if (userStatistics) {
    if (isValidData(userStatistics.totalComments)) {
      seriesDataComment.push({
        id: "1",
        label: "Total Comments",
        data: [userStatistics.totalComments, 0],
        color: "#22ffe5",
      });
    }
    if (isValidData(userStatistics.totalCommentLikes)) {
      seriesDataComment.push({
        id: "2",
        label: "Total Comment Likes",
        data: [0, userStatistics.totalCommentLikes],
        color: "#9C27B0",
      });
    }
  }

  const blogCards = [];
  if (userStatistics) {
    if (userStatistics.mostPopularBlog) {
      blogCards.push({
        blog: userStatistics.mostPopularBlog,
        badge: "rosette-best.png",
      });
    }
    if (userStatistics.latestBlog) {
      blogCards.push({
        blog: userStatistics.latestBlog,
        badge: "rosette-latest-blog.png",
      });
    }
  }

  const hasStatistics =
    blogData.length > 0 || blogCards.length > 0 || seriesDataComment.length > 0;

  return (
    <div className="page-height w-full relative">
      {loading ? (
        <div className="absolute flex flex-col items-center justify-center h-full w-full">
          <ClipLoader size={60} color="#B9D0F0" loading={loading} />
          <p className="mt-4 text-lg md:text-xl">Fetching Statistics...</p>
        </div>
      ) : !hasStatistics ? (
        <div className="flex items-center justify-center h-full">
          <p className="mt-10 text-lg md:text-xl">No Statistics Found</p>
        </div>
      ) : (
        <>
          <div className="h-fit absolute top-5 right-[30px] xl:right-[78px]">
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
          <div className="py-20 px-5 2xl:px-10 flex flex-col text-center 2xl:text-left 2xl:flex-row w-full max-w-[1450px] mx-auto justify-center gap-10 md:gap-3">
            {blogCards.length > 0 && (
              <div className="flex flex-col md:flex-row justify-center flex-wrap gap-10 md:gap-0 xl:gap-10 items-start text-left w-[300px] md:w-[680px] xl:w-[720px] 2xl:w-[360px] mx-auto mb-5 2xl:mb-0">
                {blogCards.map((card, index) => (
                  <StatisticCard key={index} {...card} />
                ))}
              </div>
            )}
            <div className="flex flex-col justify-start items-center gap-3 2xl:w-[425px]">
              <div className="w-full border border-gray-600 text-center">
                <h3 className="text-xl font-semibold">Blog Statistics</h3>
              </div>
              <div className="flex flex-col lg:flex-row 2xl:flex-col">
                <div className="relative w-[400px] xl:w-[450px] 2xl:w-[425px] h-[300px] md:h-[400px] mx-auto">
                  <BarChart
                    xAxis={[{ scaleType: "band", data: xAxisDataBlog }]}
                    series={seriesDataBlog}
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="relative w-[400px] md:w-[500px] 2xl:w-[425px] h-[150px] md:h-[200px] lg:h-[250px] 2xl:h-[170px] mt-4 mx-auto">
                  <PieChart
                    series={[
                      {
                        data: blogData,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
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
            </div>
            <div className="flex flex-col justify-start items-center gap-3 h-fit">
              <div className="w-full border border-gray-600 text-center">
                <h3 className="text-xl font-semibold">Comment Statistics</h3>
              </div>
              <div className="relative w-[400px] xl:w-[450px] h-[300px] md:h-[400px] mx-auto">
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
