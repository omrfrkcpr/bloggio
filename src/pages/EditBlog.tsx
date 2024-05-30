/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Preview from "../layouts/Preview";
import { FaCircleArrowRight } from "react-icons/fa6";
import { toastWarnNotify } from "../helper/toastNotify";
import CustomButton from "../components/commons/CustomButton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";

const EditBlog = () => {
  const { getSingleBlog } = useBlogCalls();
  const { singleBlog } = useSelector((state: any) => state.blog);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { blogId } = useParams();

  useEffect(() => {
    getSingleBlog(`blogs/${blogId}`);
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
        <section className="min-h-[86.8vh] h-full w-[90%] md:w-[80%] mx-auto max-w-[1000px] relative">
          <div className="mt-5">
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
                toastWarnNotify(
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
