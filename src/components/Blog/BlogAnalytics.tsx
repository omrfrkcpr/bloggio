/* eslint-disable @typescript-eslint/no-explicit-any */
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import { Heart } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import BlogSettings from "./BlogSettings";
import { formatNum } from "../../helper/functions";
import { RootState } from "../../app/store";
import useShowModal from "../../hooks/useShowModal";
import { toastInfoNotify } from "../../helper/toastNotify";
import { useLocation, useNavigate } from "react-router-dom";
// import { RootState } from "../../app/store";

const BlogAnalytics: React.FC<BlogAnalyticsProps> = ({
  blogDetails,
  likes,
  countOfVisitors,
  _id,
  userId,
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);
  // const { saved } = useSelector((state: RootState) => state.blog); // TODO
  const { toggleCommentsModal } = useShowModal();
  const { showCommentsModal } = useSelector((state: RootState) => state.modal);
  const navigate = useNavigate();
  const location = useLocation();
  const { postLike } = useBlogCalls();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const isUserLiked = likes?.includes(currentUser?._id);

  // console.log(location.pathname);

  useEffect(() => {
    if (currentUser && isUserLiked) {
      setIsLiked(true);
    }
  }, [currentUser, isUserLiked]);

  const handleLikeClick = async () => {
    if (currentUser) {
      await postLike(`blogs/${_id}/like`, _id);
    } else {
      toastInfoNotify("Please login to like a blog.");
    }
  };

  const handleGoComments = async () => {
    const path = location?.pathname.includes(_id as string);
    if (currentUser) {
      if (!path && !showCommentsModal) {
        await navigate(`/blog/${_id}`);
      }
      setTimeout(
        () => {
          toggleCommentsModal();
        },
        !path ? 1000 : 0
      );
    } else {
      toastInfoNotify("Please login to see blog comments.");
    }
  };

  // console.log(likes);

  const analytics = [
    {
      key: "likes",
      icon: (
        <Heart
          onClick={handleLikeClick}
          weight={isLiked && isUserLiked ? "fill" : "thin"}
          className={`cursor-pointer hover:scale-125 ${
            isLiked && isUserLiked ? "text-red-500" : "text-[#A1A1A1]"
          }`}
          data-test="heart-icon"
        />
      ),
      count: blogDetails?.countOfLikes,
    },
    {
      key: "comments",
      icon: (
        <CommentIcon
          onClick={handleGoComments}
          sx={{
            fontSize: { xs: "0.8rem", md: "0.9rem" },
            cursor: "pointer",
            color: "#A1A1A1",
            "&:hover": { color: "black" },
          }}
          data-test="comment-icon"
        />
      ),
      count: blogDetails?.countOfComments,
    },
    {
      key: "visitors",
      icon: (
        <VisibilityIcon
          sx={{
            fontSize: { xs: "0.8rem", md: "0.9rem" },
            color: "#A1A1A1",
          }}
        />
      ),
      count: countOfVisitors,
    },
  ];

  return (
    <div className="flex gap-[0.2rem] items-center" data-test="blog-analytics">
      {analytics.map(({ key, icon, count }) => (
        <p key={key} className="space-x-1 flex items-center">
          {icon}
          <span className="text-[10px] md:text-[12px] lg:text-[16px]">
            {formatNum(count)}
          </span>
        </p>
      ))}
      <BlogSettings blogId={_id} userId={userId} />
    </div>
  );
};

export default BlogAnalytics;
