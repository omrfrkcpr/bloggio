/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Preview from "../layouts/Preview";
import { FaCircleArrowRight } from "react-icons/fa6";
import CustomButton from "../utils/CustomButton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { RootState } from "../app/store";
import toastNotify from "../helpers/toastNotify";

const EditBlog = () => {
  const { getSingleBlog } = useBlogCalls();
  const { singleBlog } = useSelector((state: RootState) => state.blog);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<Category>();
  const { blogId } = useParams<{ blogId: string }>();

  useEffect(() => {
    if (blogId) {
      getSingleBlog(blogId);
    }
  }, [blogId]);

  useEffect(() => {
    if (singleBlog) {
      setTitle(singleBlog?.title);
      setDescription(singleBlog?.content);
      setImage(singleBlog?.image);
      setCategory(singleBlog?.categoryId);
    }
  }, [singleBlog]);

  return (
    <>
      {!isOpen && (
        <section className="page-height w-[90%] md:w-[80%] mx-auto max-w-[1000px] relative">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="text-4xl outline-none w-full mt-[5rem]"
            />
            <ReactQuill
              theme="bubble"
              value={description}
              onChange={setDescription}
              placeholder="Write your new blog..."
              className="write my-5 min-h-[65vh]"
            />
          </div>
          <CustomButton
            click={() => {
              if (title || description) {
                setIsOpen(true);
              } else {
                toastNotify(
                  "warn",
                  "Before continuing, please write content for your new blog."
                );
              }
            }}
            className={`${
              isOpen && "hidden"
            } flex gap-2 items-center justify-center absolute top-5 z-20 right-0 py-2 px-3 bg-[#ee9f30] text-white  hover:bg-[#f0c281] rounded-full transition-all duration-500`}
            icon={<FaCircleArrowRight />}
            title="Continue Updating"
          />
        </section>
      )}
      {isOpen && (
        <div>
          <Preview
            setIsOpen={setIsOpen}
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            image={image}
            tags={singleBlog?.tags}
            category={category}
            type="Update"
            blogId={blogId}
          />
        </div>
      )}
    </>
  );
};

export default EditBlog;
