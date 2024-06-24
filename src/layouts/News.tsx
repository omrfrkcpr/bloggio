/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
// import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import useNewsCalls from "../hooks/useNewsCalls";
import spinner2 from "../assets/spinner2.gif";
import { GiWorld } from "react-icons/gi";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NewsList from "../components/News/NewsList";

const News = ({ categoryName }: { categoryName: string }) => {
  const { news, loading, totalResults } = useSelector(
    (state: any) => state.news
  );
  const { getNewsData } = useNewsCalls();
  const [page, setPage] = useState<number>(1);

  // console.log(news);
  // console.log(totalResults);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    getNewsData(categoryName, page);
  }, [page]);

  return (
    <div className="hidden lg:block mt-6 max-h-[680px] mx-auto">
      <h2 className="font-semibold text-[10px] text-gray-600 md:text-[14px] lg:text-[18px] text-center flex items-center justify-start md:justify-center gap-2">
        <GiWorld />
        <span className="capitalize">
          Top {categoryName === "software" ? "Tech" : categoryName} News
        </span>
      </h2>
      {loading ? (
        <div className="my-5">
          <img
            src={spinner2}
            alt="news-spinner"
            className="w-[60px] h-[60px] m-auto text-center"
          />
        </div>
      ) : (
        <>
          <NewsList news={news} />
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={Math.floor(totalResults / 5)}
              page={page}
              onChange={handlePageChange}
              size="small"
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </>
      )}
    </div>
  );
};

export default News;
