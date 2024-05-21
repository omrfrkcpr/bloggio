/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import lock from "../../assets/lock.svg";
import openLock from "../../assets/open-lock.svg";
import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";
import { faker } from "@faker-js/faker";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastInfoNotify } from "../../helper/toastNotify";
import useShowModal from "../../hooks/useShowModal";
import AuthModal from "../Modals/AuthModal";
import { RootState } from "../../app/store";
import usePath from "../../hooks/usePath";
import BlogAnalytics from "../commons/BlogAnalytics";
import {
  shortenText,
  dateFormatter,
  calculateReadTime,
} from "../../helper/functions";

const BlogCard: React.FC<BlogCardProps> = ({
  _id,
  userId,
  title,
  content,
  image,
  comments,
  likes,
  countOfVisitors,
  createdAt,
  categoryName,
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { showBlogCardModal } = useSelector((store: RootState) => store.modal);
  const { toggleBlogCardModal } = useShowModal();
  const { getNavigatePath } = usePath();
  const navigate = useNavigate();

  const randomFirstName = faker.person.firstName();
  const randomLastName = faker.person.lastName();

  const userImage = currentUser?.image
    ? currentUser?.image
    : `https://api.dicebear.com/8.x/avataaars/svg?seed=${randomFirstName}`;

  // checking userImage response data
  const isDicebearImage = userImage.startsWith(
    "https://api.dicebear.com/8.x/avataaars/svg?seed="
  );

  const handleReadMore = () => {
    if (currentUser) {
      navigate(`/details/${_id}`, {
        state: { randomFirstName, randomLastName, userImage, categoryName },
      });
    } else {
      toggleBlogCardModal();
      toastInfoNotify(
        "To read more, please register first or log in if you have an account."
      );
      getNavigatePath(`/details/${_id}`, {
        state: { randomFirstName, randomLastName, userImage },
      });
    }
  };

  return (
    <>
      <li className="relative flex items-start justify-center gap-[15px] w-[95%] mx-auto">
        <div className="order-1 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-center leading-normal w-[540px]">
          <div className="mb-4">
            <div className="flex space-x-1 mb-1">
              <div className="text-[10px] lg:text-[12px]  text-gray-600 flex items-center space-x-1">
                <img src={openLock} alt="read-permission-status" width="12px" />
                <span>Public</span>
                <StarIcon
                  sx={{ fontSize: { xs: "12px", md: "15px" }, color: "orange" }}
                />
              </div>
              <div>
                <span className="text-[10px] lg:text-[12px] bg-black/30 rounded-md py-[2px] px-2 text-white">
                  {categoryName}
                </span>
              </div>
            </div>
            <div
              className="text-gray-900 font-bold text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] lg:mb-2 cursor-pointer"
              onClick={handleReadMore}
            >
              {title}
            </div>
            <p
              className="text-gray-700 mt-2 text-[9px] md:text-[12px] lg:text-[14px] xl:text-[16px] cursor-pointer"
              onClick={handleReadMore}
            >
              {shortenText(content)}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center justify-center">
              {isDicebearImage ? (
                <img
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 border-[.5px] border-gray"
                  src={userImage}
                />
              ) : (
                (
                  <Avatar
                    alt={`${randomFirstName} ${randomLastName}`}
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: { xs: "25px", md: "32px" },
                      height: { xs: "25px", md: "32px" },
                      mr: 1,
                      backgroundColor: "#B9D0F0",
                    }}
                  />
                ) || (
                  <Avatar
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: { xs: "25px", md: "32px" },
                      height: { xs: "25px", md: "32px" },
                      mr: 1,
                      backgroundColor: "#B9D0F0",
                    }}
                  />
                )
              )}
              <div className="text-sm">
                <p className="text-[10px] lg:text-[12px] xl:text-[16px] text-gray-900 leading-none">{`${randomFirstName} ${randomLastName}`}</p>
                <p className="text-gray-600 space-x-1 text-[10px]  lg:text-[12px] xl:text-[14px] ">
                  <span>{dateFormatter(createdAt)} -</span>
                  <span>{`${calculateReadTime(content)} min read`}</span>
                </p>
              </div>
            </div>
            <div className="flex space-x-1 xl:space-x-4">
              <BlogAnalytics
                likes={likes}
                comments={comments}
                countOfVisitors={countOfVisitors}
                _id={_id}
                userId={userId}
              />

              <div className="hidden md:flex items-center">
                <button
                  onClick={handleReadMore}
                  className="bg-[#85b2f0] text-[10px] lg:text-[12px] xl:text-[14px] py-[0.1rem] md:py-[0.5rem] lg:py-1 px-[0.5rem] md:px-[0.8rem] lg:px-1 rounded-xl text-white hover:bg-[#B9D0F0]"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center m-auto">
          <img
            src={image}
            alt="blog-img"
            className="shadow-md rounded-lg bg-slate-50 object-cover w-[130px] h-[90px] md:h-[120px] md:w-[200px] lg:w-[280px] lg:h-[180px] m-auto"
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