/* eslint-disable @typescript-eslint/no-explicit-any */
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import { Bookmarks, Heart } from "@phosphor-icons/react";
import { useState } from "react";

const BlogAnalytics: React.FC<BlogAnalyticsProps> = ({
  likes,
  comments,
  countOfVisitors,
  show,
  setShow,
  _id,
  userId,
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { postLike } = useBlogCalls();
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    await postLike(`blogs/${_id}/postLike`, userId);
    setIsLiked(true);
  };

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
          className={`cursor-pointer hover:text-black hover:scale-125 ${
            isLiked &&
            likes?.filter((like: string | unknown) => like === currentUser?._id)
              .length > 0 &&
            "text-red-500"
          }`}
        />
        <span className="text-[10px] md:text-[12px] lg:text-[16px]">
          {likes?.length}
        </span>
      </p>
      <p className="space-x-1" onClick={() => setShow && setShow(!show)}>
        <CommentIcon
          sx={{
            fontSize: { xs: "0.8rem", md: "1rem" },
            cursor: "pointer",
            color: "#A1A1A1",
            "&:hover": { color: "black" },
          }}
        />
        <span className="text-[10px] md:text-[12px] lg:text-[16px]">
          {comments?.length}
        </span>
      </p>
      <p className="space-x-1">
        <VisibilityIcon
          sx={{
            fontSize: { xs: "0.8rem", md: "1rem" },
            color: "#A1A1A1",
          }}
        />
        <span className="text-[10px] md:text-[12px] lg:text-[16px]">
          {countOfVisitors}
        </span>
      </p>
      <Bookmarks
        className="text-[0.8rem] md:text-[1rem] cursor-pointer text-[#a1a1a1] hover:text-black hover:scale-125"
        size={24}
        weight="thin"
        // weight="fill"
      />
    </div>
  );
};

export default BlogAnalytics;
