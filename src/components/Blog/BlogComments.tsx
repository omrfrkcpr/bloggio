/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { useSelector } from "react-redux";
import useShowModal from "../../hooks/useShowModal";
import { RootState } from "../../app/store";
import { useState } from "react";
import useBlogCalls from "../../hooks/useBlogCalls";
import CustomModal from "../Modals/CustomModal";
import { LiaTimesSolid } from "react-icons/lia";
import Loading from "../commons/Loading";
import { toastErrorNotify } from "../../helper/toastNotify";
import BlogCommentCard from "../Cards/BlogCommentCard";
import { capitalizeWords } from "../../helper/functions";
import { Avatar } from "@mui/material";
import CustomButton from "../commons/CustomButton";

const BlogComments = ({ blogId }: { blogId: string }) => {
  const { toggleCommentsModal } = useShowModal();
  const { showCommentsModal } = useSelector((state: RootState) => state.modal);
  const { currentUser } = useSelector((state: any) => state.auth);
  const { comments, loading } = useSelector((state: RootState) => state.blog);
  const { postBlogData } = useBlogCalls();
  const [commentPrev, setCommentPrev] = useState({
    blogId,
    comment: "",
  });

  const commentsData = comments
    .filter((comment: CommentProps) => comment?.blogId === blogId)
    .slice()
    .reverse();

  const writeComment = async () => {
    try {
      if (commentPrev.comment === "") {
        toastErrorNotify("The input must be filled.");
      }

      await postBlogData("comments", { ...commentPrev });
      setCommentPrev({
        ...commentPrev,
        comment: "",
      });
    } catch (error: any) {
      toastErrorNotify(error.message);
    }
  };

  return (
    <CustomModal
      setModal={toggleCommentsModal}
      modal={showCommentsModal}
      hidden=""
    >
      <section
        className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadows p-5
    overflow-y-auto transition-all duration-500
    ${showCommentsModal ? "translate-x-0" : "translate-x-[23rem]"}
  `}
      >
        {/* header  */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">
            Comments ({commentsData?.length})
          </h3>
          <CustomButton
            click={() => toggleCommentsModal()}
            className="text-xl cursor-pointer"
            icon={<LiaTimesSolid />}
            title=""
          />
        </div>
        {/* comment form  */}
        {currentUser && (
          <div className="shadows p-3 my-5 overflow-hidden">
            <div className="flex items-center gap-2 mb-5">
              {currentUser?.image ? (
                <img
                  className="w-[2rem] h-[2rem] rounded-full object-cover"
                  src={currentUser?.image}
                  alt="user-image"
                />
              ) : (
                <Avatar
                  alt={
                    currentUser && `${capitalizeWords(currentUser?.firstName)}`
                  }
                  src="/static/images/avatar/2.jpg"
                  sx={{ width: "32px", height: "32px" }}
                />
              )}
              <h3 className="text-sm">{currentUser?.username}</h3>
            </div>
            <textarea
              value={commentPrev.comment}
              onChange={(e) =>
                setCommentPrev({ ...commentPrev, comment: e.target.value })
              }
              placeholder="What are your thoughts?"
              className="w-full outline-none resize-none scrollbar-hide text-sm border px-2 pt-4"
            ></textarea>
            <div className="flex items-center justify-end gap-4 mt-[1rem]">
              <CustomButton
                click={() => {
                  setCommentPrev({ ...commentPrev, comment: "" });
                  toggleCommentsModal();
                }}
                className="text-sm cursor-pointer"
                icon={undefined}
                title="Cancel"
              />
              <CustomButton
                click={() => writeComment()}
                className="px-2 py-1 !text-xs !bg-green-700 hover:bg-green-300 !text-white !rounded-full cursor-pointer"
                title="Response"
                icon={undefined}
              />
            </div>
          </div>
        )}
        {commentsData && !commentsData?.length ? (
          <p>This post has no comments</p>
        ) : (
          <div className="border-t py-4 mt-8 flex flex-col gap-8">
            {commentsData &&
              commentsData?.map((commentData: CommentProps) =>
                loading ? (
                  <Loading />
                ) : (
                  <BlogCommentCard
                    commentData={commentData}
                    blogId={blogId}
                    key={commentData._id}
                  />
                )
              )}
          </div>
        )}
      </section>
    </CustomModal>
  );
};

export default BlogComments;
