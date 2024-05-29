/* eslint-disable @typescript-eslint/no-explicit-any */
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import { Bookmarks, Heart } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import BlogShare from "./BlogShare";
import { formatNum } from "../../helper/functions";
import { RootState } from "../../app/store";
import useShowModal from "../../hooks/useShowModal";
import { toastErrorNotify } from "../../helper/toastNotify";
import { useLocation, useNavigate } from "react-router-dom";
// import { RootState } from "../../app/store";

const BlogAnalytics: React.FC<BlogAnalyticsProps> = ({
  likes,
  comments,
  countOfVisitors,
  _id,
  // userId,
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);
  // const { saved } = useSelector((state: RootState) => state.blog); // TODO
  const { toggleCommentsModal } = useShowModal();
  const { showCommentsModal } = useSelector((state: RootState) => state.modal);
  const navigate = useNavigate();
  const location = useLocation();
  const { postLike } = useBlogCalls();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // console.log(location.pathname);

  useEffect(() => {
    if (currentUser && likes?.includes(currentUser?._id)) {
      setIsLiked(true);
    }
  }, [currentUser, likes]);

  const handleLikeClick = async () => {
    await postLike(`blogs/${_id}/postLike`, _id);
    setIsLiked(true);
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
      toastErrorNotify("Please login to see blog comments.");
    }
  };

  // console.log(likes);

  return (
    <div className="flex gap-[0.2rem] xl:gap-[0.5rem]  items-center">
      <p className="space-x-1 flex items-center">
        <Heart
          onClick={handleLikeClick}
          weight={`${
            isLiked &&
            likes?.filter((like: string | unknown) => like === currentUser?._id)
              .length > 0
              ? "fill"
              : "thin"
          }`}
          className={`cursor-pointer hover:scale-125 ${
            isLiked &&
            likes?.filter((like: string | unknown) => like === currentUser?._id)
              .length > 0 &&
            "text-red-500"
          }`}
        />
        <span className="text-[10px] md:text-[12px] lg:text-[16px]">
          {formatNum(likes?.length)}
        </span>
      </p>
      <p className="space-x-1 flex items-center justify-center">
        <CommentIcon
          onClick={handleGoComments}
          sx={{
            fontSize: { xs: "0.8rem", md: "0.9rem" },
            cursor: "pointer",
            color: "#A1A1A1",
            "&:hover": { color: "black" },
          }}
        />
        <span className="text-[10px] md:text-[12px] lg:text-[16px]">
          {formatNum(comments?.length)}
        </span>
      </p>
      <p className="space-x-1 flex items-center justify-center">
        <VisibilityIcon
          sx={{
            fontSize: { xs: "0.8rem", md: "0.9rem" },
            color: "#A1A1A1",
          }}
        />
        <span className="text-[10px] md:text-[12px] lg:text-[16px]">
          {formatNum(countOfVisitors)}
        </span>
      </p>
      <Bookmarks
        className="text-[0.8rem] md:text-[0.9rem] cursor-pointer text-[#a1a1a1] hover:text-black hover:scale-125"
        size={24}
        weight="thin"
        // weight="fill"
      />
      <BlogShare blogId={_id}/>
    </div>
  );
};

export default BlogAnalytics;
