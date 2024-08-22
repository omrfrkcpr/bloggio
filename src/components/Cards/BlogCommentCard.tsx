import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { capitalizeWords, dateFormatter } from "../../helpers/functions";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import DropDown from "../../utils/DropDown";
import { RootState } from "../../app/store";
import useBlogCalls from "../../hooks/useBlogCalls";
import { Avatar } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import CustomButton from "../../utils/CustomButton";
import CustomImage from "../../utils/CustomImage";
import toastNotify from "../../helpers/toastNotify";

const BlogCommentCard: React.FC<BlogCommentCardProps> = ({
  commentData,
  blogId,
}) => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.blog);
  const { deleteBlogData, putBlogData } = useBlogCalls();
  const [drop, setDrop] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<string>("");
  const dropDownRef = useRef<HTMLDivElement>(null);

  const { _id, userId, comment, createdAt, updatedAt } = commentData;

  const removeComment = async () => {
    await deleteBlogData({ url: "comments", id: _id, blogId });
    setDrop(false);
  };

  const editCommentText = () => {
    setIsEdit(true);
    setDrop(false);
    setEditComment(comment);
  };

  const handleEdit = async () => {
    if (editComment) {
      await putBlogData(
        "comments",
        {
          blogId,
          comment: editComment,
        },
        _id
      );
      setEditComment("");
      setIsEdit(false);
      setDrop(false);
    } else {
      toastNotify("warn", "Please write your thoughts.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <section className="border-b">
      {!isEdit ? (
        <>
          <div className="flex items-center gap-2">
            {currentUser?.avatar ? (
              <CustomImage
                className="w-[2rem] h-[2rem] rounded-full object-cover"
                src={currentUser?.avatar}
                alt="user-avatar"
              />
            ) : (
              <Avatar
                alt={`${
                  currentUser ? capitalizeWords(currentUser?.firstName) : ""
                }`}
                src="/static/images/avatar/2.jpg"
                sx={{ width: "32px", height: "32px" }}
              />
            )}
            <div className="flex-1 flex justify-between">
              <div>
                <h2 className="text-sm">{currentUser?.username}</h2>
                <p className="text-sm text-gray-400">
                  {dateFormatter(updatedAt || createdAt)}
                </p>
              </div>
              <div className="relative" ref={dropDownRef}>
                {currentUser?._id === userId?._id && (
                  <>
                    <CustomButton
                      click={() => setDrop(!drop)}
                      className="text-2xl hover:opacity-70"
                      icon={<BiDotsHorizontalRounded />}
                    />
                    <DropDown
                      showDrop={drop}
                      setShowDrop={setDrop}
                      size="w-[10rem]"
                      // ref={dropDownRef}
                    >
                      <CustomButton
                        click={editCommentText}
                        title="Edit this response"
                        icon={<MdModeEdit />}
                        className="text-gray-600 text-sm hover:text-black gap-1 flex items-center justify-start py-2 px-2  hover:bg-gray-100"
                      />
                      <CustomButton
                        click={removeComment}
                        title="Delete"
                        icon={<MdDelete />}
                        className="text-gray-600 text-sm hover:text-black gap-1 flex items-center justify-start py-2 px-2  hover:bg-gray-100"
                      />
                    </DropDown>
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="py-4 text-sm" data-test="comment">
            {more ? comment : comment.substring(0, 100)}
            {comment.length > 100 && (
              <CustomButton
                click={() => setMore(!more)}
                title={more ? "...less" : "...more"}
                className="hover:underline"
              />
            )}
          </p>
        </>
      ) : (
        <div className="bg-white shadows p-4 z-50">
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            placeholder="Write your update text..."
            className="w-full resize-none outline-none text-sm"
          ></textarea>
          <div className="flex items-center justify-end gap-2">
            <CustomButton
              click={() => setIsEdit(false)}
              className="w-fit text-sm"
              title="Cancel"
            />

            <CustomButton
              click={handleEdit}
              className="px-2 py-1 text-white bg-orange-600 hover:bg-orange-300 !rounded-full text-xs"
              title={loading ? "Updating..." : "Update"}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogCommentCard;
