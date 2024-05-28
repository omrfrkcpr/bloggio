/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { dateFormatter } from "../../helper/functions";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import DropDown from "../commons/DropDown";
import { RootState } from "../../app/store";
import useBlogCalls from "../../hooks/useBlogCalls";
import { toastWarnNotify } from "../../helper/toastNotify";

const BlogCommentCard: React.FC<BlogCommentCardProps> = ({
  commentData,
  blogId,
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { loading } = useSelector((state: RootState) => state.blog);
  const { deleteBlogData, putBlogData } = useBlogCalls();
  const [drop, setDrop] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<string>("");
  const dropDownRef = useRef<HTMLDivElement>(null);

  const { _id, userId, comment, createdAt, updatedAt } = commentData;

  const removeComment = async () => {
    if (window.confirm("Are you sure you want to delete your comment"))
      await deleteBlogData("comments", _id);
  };

  const editCommentText = () => {
    setIsEdit(true);
    setDrop(false);
    setEditComment(comment);
  };

  const handleEdit = async () => {
    if (editComment) {
      await putBlogData("comments", {
        blogId,
        comment: editComment,
      });
      setEditComment("");
      setIsEdit(false);
      setDrop(false);
    } else {
      toastWarnNotify("Please write your thoughts.");
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
          <div className="flex items-center gap-5">
            <img
              className="w-[2rem] h-[2rem] object-cover rounded-full"
              src={currentUser?.image || "/profile.jpg"}
              alt="user-img"
            />
            <div className="flex-1 flex justify-between">
              <div>
                <h2 className="text-sm">{currentUser?.username}</h2>
                <p className="text-sm text-gray-400">
                  {dateFormatter(updatedAt || createdAt)}
                </p>
              </div>
              <div className="relative">
                {currentUser?._id === userId?._id && (
                  <>
                    <button
                      onClick={() => setDrop(!drop)}
                      className="text-2xl hover:opacity-70"
                    >
                      <BiDotsHorizontalRounded />
                    </button>
                    <div ref={dropDownRef}>
                      <DropDown
                        showDrop={drop}
                        setShowDrop={setDrop}
                        size="w-[10rem]"
                      >
                        <Button
                          click={editCommentText}
                          title="Edit this response"
                        />
                        <Button click={removeComment} title="Delete" />
                      </DropDown>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="py-4 text-sm">
            {more ? comment : comment.substring(0, 100)}
            {comment.length > 100 && (
              <button onClick={() => setMore(!more)}>
                {more ? "...less" : "...more"}
              </button>
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
            <button
              onClick={() => setIsEdit((prevState) => !prevState)}
              className="w-fit text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="px-2 py-1 !text-white !bg-green-700 hover:bg-green-300 !rounded-full !text-xs"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogCommentCard;

const Button = ({ click, title }: { click: () => void; title: string }) => {
  return (
    <button
      onClick={click}
      className="p-2 hover:bg-gray-200 text-black/80 w-full text-sm text-left"
    >
      {title}
    </button>
  );
};
