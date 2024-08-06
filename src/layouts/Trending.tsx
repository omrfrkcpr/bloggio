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
import { GiChart } from "react-icons/gi";

import useShowModal from "../hooks/useShowModal";
import usePath from "../hooks/usePath";
import { useState, useEffect, useMemo } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { formatNum, getTrendBlogs } from "../helper/functions";
import CustomImage from "../utils/CustomImage";
import CustomButton from "../utils/CustomButton";

const Trending = () => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { toggleBlogCardModal } = useShowModal();
  const { getNavigatePath } = usePath();
  const { getTrendsData } = useBlogCalls();
  const navigate = useNavigate();
  const { trendings, blogs } = useSelector((state: RootState) => state.blog);
  const [trendBlogs, setTrendBlogs] = useState<any[]>([]);

  useEffect(() => {
    getTrendsData();
  }, [blogs]);

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
      <h2 className="text-xl font-bold mb-5 mx-auto border-b border-gray-300 w-[92%] max-w-[1600px] text-gray-600 flex gap-2 items-center">
        <GiChart /> Trending on Bloggio
      </h2>
      <Swiper
        // swiper configurations
        modules={[Navigation, Pagination, A11y, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-[95%] h-[280px] max-w-[1600px] border-b border-gray-300"
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
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1600: {
            slidesPerView: 6,
            spaceBetween: 0,
          },
        }}
      >
        {trendBlogs.map((blog: any) => {
          const { _id, title, image, countOfVisitors } = blog;
          return (
            <SwiperSlide key={_id}>
              <div className="rounded-lg shadow-lg overflow-hidden w-[160px] h-[220px] xl:w-[190px] mx-auto flex flex-col justify-between bg-[#bed9fd3a]">
                <div>
                  <CustomImage
                    onClick={() => handleClickMore(_id)}
                    src={image}
                    alt={title}
                    className="w-[100vw] h-20 xl:h-[100px] object-fit cursor-pointer"
                  />
                  <h3
                    onClick={() => handleClickMore(_id)}
                    className="text-[12px] font-semibold px-4 py-2 cursor-pointer text-center"
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
                      {formatNum(countOfVisitors)}
                    </span>
                  </p>
                  <CustomButton
                    click={() => handleClickMore(_id)}
                    className="hover:underline font-semibold text-black/60 text-[12px]"
                    title="More..."
                  />
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
