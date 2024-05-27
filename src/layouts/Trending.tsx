/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { toastInfoNotify } from "../helper/toastNotify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useShowModal from "../hooks/useShowModal";
import usePath from "../hooks/usePath";
import { useState, useEffect, useMemo } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { getTrendBlogs } from "../helper/functions";

const Trending = () => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { toggleBlogCardModal } = useShowModal();
  const { getNavigatePath } = usePath();
  const { getTrendsData } = useBlogCalls();
  const navigate = useNavigate();
  const { trendings } = useSelector((state: RootState) => state.blog);
  const [trendBlogs, setTrendBlogs] = useState<any[]>([]);

  useEffect(() => {
    getTrendsData();
  }, []);

  const countOfVisitorsArray = useMemo(
    () => trendings.map((trend: any) => trend?.countOfVisitors),
    [trendings]
  );

  useEffect(() => {
    setTrendBlogs(getTrendBlogs(trendings));
  }, [countOfVisitorsArray]);

  const randomFirstName = faker.person.firstName(); // TODO
  const randomLastName = faker.person.lastName(); // TODO

  const userImage = currentUser?.image
    ? currentUser?.image
    : `https://api.dicebear.com/8.x/avataaars/svg?seed=${randomFirstName}`; // TODO

  const handleClickMore = (blogId: string) => {
    if (currentUser) {
      navigate(`/blog/${blogId}`, {
        state: {
          randomFirstName,
          randomLastName,
          userImage,
          blogId,
        },
      });
    } else {
      toggleBlogCardModal();
      toastInfoNotify(
        "To read more, please register first or log in if you have an account."
      );
      getNavigatePath(`/blog/${blogId}`, {
        state: { randomFirstName, randomLastName, userImage, blogId },
      });
    }
  };

  return (
    <div className="py-5">
      <h2 className="text-2xl font-bold mb-5 text-center border-b border-gray-300 w-[95%] max-w-[1600px] mx-auto">
        Trending
      </h2>
      <Swiper
        // swiper configurations
        modules={[Navigation, Pagination, A11y, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-[95%] h-[240px] xl:h-[280px] max-w-[1600px] border-b border-gray-300"
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {trendBlogs.map((blog: any) => {
          const { _id, title, image, countOfVisitors } = blog;
          return (
            <SwiperSlide key={_id}>
              <div className="rounded-lg shadow-lg overflow-hidden w-[180px] h-[190px] xl:h-[230px] xl:w-[250px] mx-auto flex flex-col justify-between bg-[#bed9fd3a]">
                <div>
                  <img
                    onClick={() => handleClickMore(_id)}
                    src={image}
                    alt={title}
                    className="w-full h-30 h-[100px] object-fit cursor-pointer"
                  />
                  <h3
                    onClick={() => handleClickMore(_id)}
                    className="text-[12px] xl:text-[16px] font-semibold px-4 py-2 cursor-pointer text-center"
                  >
                    {title}
                  </h3>
                </div>
                <div className="px-4 py-1 flex items-center text-gray-600 justify-between border-t border-gray-300 bg-[#b9d0f071]">
                  <p className="space-x-1 flex items-center justify-center">
                    <VisibilityIcon
                      sx={{
                        fontSize: { xs: "0.8rem", md: "0.9rem" },
                        color: "#A1A1A1",
                      }}
                    />
                    <span className="text-[12px] xl:text-[16px]">
                      {countOfVisitors}
                    </span>
                  </p>
                  <button
                    onClick={() => handleClickMore(_id)}
                    className="hover:underline font-semibold text-black/60 text-[12px] xl:text-[16px]"
                  >
                    More...
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Trending;
