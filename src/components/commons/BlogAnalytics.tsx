/* eslint-disable @typescript-eslint/no-explicit-any */
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
// import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

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
    <div className="flex gap-[0.2rem] xl:gap-[0.5rem]  items-center">
      <p className="space-x-1">
        <FavoriteIcon
          onClick={handleLikeClick}
          sx={{
            fontSize: { xs: "0.8rem", md: "1rem" },
            cursor: "pointer",
            "&:hover": { color: "black" },
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
            "&:hover": { color: "black" },
          }}
        />
        <span className="text-[10px] md:text-[16px]">{comments?.length}</span>
      </p>
      <p className="space-x-1">
        <VisibilityIcon
          sx={{
            fontSize: { xs: "0.8rem", md: "1rem" },
            color: "#A1A1A1",
          }}
        />
        <span className="text-[10px] md:text-[16px]">{countOfVisitors}</span>
      </p>
      <BookmarkAddOutlinedIcon
        sx={{
          color: "#A1A1A1",
          "&:hover": { color: "black" },
          cursor: "pointer",
          width: { xs: "18px", md: "25px" },
          height: { xs: "18px", md: "25px" },
        }}
      />
    </div>
  );
};

export default BlogAnalytics;
