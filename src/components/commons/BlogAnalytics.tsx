/* eslint-disable @typescript-eslint/no-explicit-any */
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";

const BlogAnalytics: React.FC<BlogAnalyticsProps> = ({
  likes,
  comments,
  countOfVisitors,
  show,
  setShow,
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);

  return (
    <div className="flex gap-4">
      <p className="space-x-1">
        <FavoriteIcon
          sx={{
            fontSize: "1rem",
            cursor: "pointer",
            color: "#A1A1A1",
          }}
        />
        <span className="text-sm">{likes?.length}</span>
      </p>
      <p className="space-x-1" onClick={() => setShow && setShow(!show)}>
        <CommentIcon
          sx={{
            fontSize: "1rem",
            cursor: "pointer",
            color:
              likes?.filter(
                (like: string | unknown) => like === currentUser?._id
              ).length > 0
                ? "red"
                : "#A1A1A1",
          }}
        />
        <span className="text-sm">{comments?.length}</span>
      </p>
      <p className="space-x-1">
        <VisibilityIcon sx={{ fontSize: "1rem", color: "#A1A1A1" }} />
        <span className="text-sm">{countOfVisitors}</span>
      </p>
    </div>
  );
};

export default BlogAnalytics;
