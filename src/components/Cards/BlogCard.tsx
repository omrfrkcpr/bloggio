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
      <li className="relative flex items-start justify-center gap-[20px]">
        <div className="order-1 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-center leading-normal w-[540px]">
          <div className="mb-4">
            <div className="flex space-x-1 mb-1">
              <div className="text-sm text-gray-600 flex items-center space-x-1">
                <img src={openLock} alt="read-permission-status" width="12px" />
                <span>Public</span>
                <StarIcon sx={{ fontSize: "15px", color: "orange" }} />
              </div>
              <div>
                <span className="text-sm bg-black/30 rounded-md py-[2px] px-2 text-white">
                  {categoryName}
                </span>
              </div>
            </div>
            <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">{shortenText(content)}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              {isDicebearImage ? (
                <img
                  className="w-8 h-8 rounded-full mr-2 border-[.5px] border-gray"
                  src={userImage}
                />
              ) : (
                (
                  <Avatar
                    alt={`${randomFirstName} ${randomLastName}`}
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: "32px",
                      height: "32px",
                      mr: 1,
                      backgroundColor: "#B9D0F0",
                    }}
                  />
                ) || (
                  <Avatar
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: "32px",
                      height: "32px",
                      mr: 1,
                      backgroundColor: "#B9D0F0",
                    }}
                  />
                )
              )}
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{`${randomFirstName} ${randomLastName}`}</p>
                <p className="text-gray-600 space-x-1">
                  <span>{dateFormatter(createdAt)} -</span>
                  <span>{`${calculateReadTime(content)} min read`}</span>
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <BlogAnalytics
                likes={likes}
                comments={comments}
                countOfVisitors={countOfVisitors}
                _id={_id}
                userId={userId}
              />

              <div className="space-x-2">
                <button
                  onClick={handleReadMore}
                  className="bg-[#85b2f0] text-sm py-1 px-2 rounded-xl text-white hover:bg-[#B9D0F0]"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>

        <img
          src={image}
          alt="blog-img"
          className="shadow-md rounded-lg bg-slate-50 object-cover w-[130px] h-[90px] md:h-[120px] md:w-[200px] lg:w-[280px] lg:h-[180px] m-auto"
        />
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
