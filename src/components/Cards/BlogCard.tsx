/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import lock from "../../assets/lock.svg";
import openLock from "../../assets/open-lock.svg";
import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastInfoNotify } from "../../helper/toastNotify";
import useShowModal from "../../hooks/useShowModal";
import AuthModal from "../Modals/AuthModal";
import { RootState } from "../../app/store";
import BlogAnalytics from "../Blog/BlogAnalytics";
import CustomImage from "../../utils/CustomImage";
import CustomButton from "../../utils/CustomButton";

const BlogCard: React.FC<BlogCardProps> = ({
  _id,
  userId,
  categoryId,
  title,
  image,
  likes,
  countOfVisitors,
  updatedAt,
  blogDetails,
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { showBlogCardModal } = useSelector((state: RootState) => state.modal);
  const { toggleBlogCardModal } = useShowModal();
  const navigate = useNavigate();

  const { firstName, lastName, avatar, username } = userId;

  const handleReadMore = () => {
    if (currentUser) {
      navigate(`/blog/${_id}`);
    } else {
      toggleBlogCardModal();
      toastInfoNotify(
        "To read more, please register first or log in if you have an account."
      );
      navigate(`/blog/${_id}`);
    }
  };

  return (
    <>
      <li className="relative flex items-start justify-center gap-[15px] w-[100%] mx-auto">
        <div className="order-1 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-center leading-normal w-[540px] md:w-[650px]">
          <div className="mb-4">
            <div className="flex space-x-1 mb-1">
              <div
                onClick={handleReadMore}
                className="text-[10px] lg:text-[12px]  text-gray-600 flex items-center space-x-1 cursor-pointer"
              >
                <CustomImage
                  src={openLock}
                  alt="read-permission-status"
                  width="12px"
                />
                <span>Public</span>
                <StarIcon
                  sx={{ fontSize: { xs: "12px", md: "15px" }, color: "orange" }}
                />
              </div>
              <CustomButton
                click={() =>
                  navigate(
                    `/categories?filter=${categoryId.name.toLowerCase()}`
                  )
                }
                className="text-[10px] lg:text-[12px] bg-gray-400 hover:bg-gray-300 hover:text-gray-600 rounded-md px-1 text-white"
                title={categoryId.name}
              />
            </div>
            <CustomButton
              className="text-gray-900 font-bold text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] lg:mb-2 cursor-pointer"
              click={handleReadMore}
              title={title}
            />
            <div
              onClick={handleReadMore}
              className="py-1 text-gray-500 line-clamp-2 text-[10px] md:text-[12px] lg:text-[16px] xl:text-[18px] cursor-pointer"
            >
              {blogDetails.contentPrev}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center justify-center">
              <Avatar
                alt={`${firstName} ${lastName}`}
                src={`${avatar}`}
                sx={{
                  width: { xs: "25px", md: "32px" },
                  height: { xs: "25px", md: "32px" },
                  mr: 1,
                  backgroundColor: "#B9D0F0",
                }}
              />
              <div className="text-sm">
                <p className="text-[10px] lg:text-[12px] xl:text-[16px] text-gray-800 leading-none">
                  @{username}
                </p>
                <p className="text-gray-600 space-x-1 text-[10px]  lg:text-[12px] xl:text-[14px] ">
                  <span>{updatedAt} -</span>
                  <span>{blogDetails.readTime}</span>
                </p>
              </div>
            </div>
            <div className="flex space-x-1 xl:space-x-2 justify-between items-center">
              <BlogAnalytics
                likes={likes}
                blogDetails={blogDetails}
                countOfVisitors={countOfVisitors}
                _id={_id}
                userId={userId._id}
              />
              <CustomButton
                click={handleReadMore}
                className="bg-[#85b2f0] text-[10px] xl:text-[14px] py-[0.1rem] md:py-[0.5rem] lg:py-1 px-[0.5rem] md:px-[0.8rem] lg:px-1 rounded-xl text-white hover:bg-[#B9D0F0] md:flex items-center justify-center text-center hidden"
                title="Read More"
                alt="readMore-blog"
              />
            </div>
          </div>
        </div>
        <div
          onClick={handleReadMore}
          className="flex items-center justify-center m-auto"
        >
          <CustomImage
            src={image}
            alt="blog-img"
            className="shadow-md rounded-lg bg-slate-50 object-fit w-[150px] h-[90px] md:h-[120px] md:w-[200px] lg:w-[280px] lg:h-[160px] m-auto cursor-pointer"
          />
        </div>
      </li>
      {showBlogCardModal && (
        <AuthModal
          isOpen={showBlogCardModal}
          setIsOpen={toggleBlogCardModal}
          selectedFormType="sign in"
        />
      )}
    </>
  );
};

export default BlogCard;
