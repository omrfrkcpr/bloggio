import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useNewsCalls from "../hooks/useNewsCalls";
import { GiWorld } from "react-icons/gi";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NewsList from "../components/News/NewsList";
import CustomImage from "../utils/CustomImage";
import setups from "../helpers/setup";
import { RootState } from "../app/store";
import { resetNews } from "../features/newsSlice";

const News = ({
  categoryName,
  show,
}: {
  categoryName: string;
  show: boolean;
}) => {
  const { news, loading, totalPage } = useSelector(
    (state: RootState) => state.news
  );
  const dispatch = useDispatch();
  const { getNewsData } = useNewsCalls();
  const [page, setPage] = useState<number>(1);

  // console.log(news);
  // console.log(totalPage);

  const convertToApiCategory = (input: string) => {
    /* Business & Finance => business+finance */

    const formattedCategory = input
      .replace(/ & /g, "+")
      .replace(/([a-z])([A-Z])/g, "$1+$2")
      .toLowerCase();

    return formattedCategory;
  };

  useEffect(() => {
    if (show) {
      if (categoryName) {
        getNewsData(page, convertToApiCategory(categoryName));
      } else {
        getNewsData(page);
      }
    } else {
      dispatch(resetNews());
    }
  }, [categoryName, page, show]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="hidden lg:block max-h-[680px] mx-auto">
      <h2 className="font-semibold text-[10px] text-gray-600 md:text-[14px] lg:text-[18px] text-center flex items-center justify-start md:justify-center gap-2">
        <GiWorld />
        <span className="capitalize">
          {categoryName ? `Top ${categoryName}` : "Latest"} News
        </span>
      </h2>
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
          {news?.length > 0 && (
            <>
              <NewsList news={news} />
              {totalPage && (
                <Stack spacing={2} alignItems="center">
                  <Pagination
                    count={+totalPage}
                    page={page}
                    onChange={handlePageChange}
                    size="small"
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Stack>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default News;
