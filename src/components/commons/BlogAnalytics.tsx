/* eslint-disable @typescript-eslint/no-explicit-any */
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

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

  const handleLikeClick = () => {
    postLike(`blogs/${_id}/postLike`, userId);
  };

  return (
    <div className="flex gap-2 md:gap-4 items-center">
      <p className="space-x-1">
        <FavoriteIcon
          onClick={handleLikeClick}
          sx={{
            fontSize: { xs: "0.8rem", md: "1rem" },
            cursor: "pointer",
            color:
              likes?.filter(
                (like: string | unknown) => like === currentUser?._id
              ).length > 0
                ? "red"
                : "#A1A1A1",
          }}
        />
        <span className="text-[10px] md:text-[16px]">{likes?.length}</span>
      </p>
      <p className="space-x-1" onClick={() => setShow && setShow(!show)}>
        <CommentIcon
          sx={{
            fontSize: { xs: "0.8rem", md: "1rem" },
            cursor: "pointer",
            color: "#A1A1A1",
          }}
        />
        <span className="text-[10px] md:text-[16px]">{comments?.length}</span>
      </p>
      <p className="space-x-1">
        <VisibilityIcon
          sx={{ fontSize: { xs: "0.8rem", md: "1rem" }, color: "#A1A1A1" }}
        />
        <span className="text-[10px] md:text-[16px]">{countOfVisitors}</span>
      </p>
      <BookmarksIcon
        sx={{
          color: "#85b2f0",
          "&:hover": { color: "#B9D0F0" },
          cursor: "pointer",
          width: { xs: "18px", md: "25px" },
          height: { xs: "18px", md: "25px" },
        }}
      />
    </div>
  );
};

export default BlogAnalytics;
