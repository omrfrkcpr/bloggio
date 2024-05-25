/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import parse from "html-react-parser";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import CreateModal from "../components/Modals/CreateModal";
import Preview from "../layouts/Preview";

const initialNewBlog = {
  categoryId: "",
  title: "",
  content: "",
  image: "",
  isPublish: true,
};

const Write = () => {
  const [newBlog, setNewBlog] = useState(initialNewBlog);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { categories } = useSelector((state: RootState) => state.blog) as any;
  const { getBlogData, postBlogData } = useBlogCalls();

  useEffect(() => {
    getBlogData("categories");
  }, []);

  // console.log(newBlog);

  return (
    <>
      <section className="min-h-[86.8vh] h-auto w-[90%] md:w-[80%] mx-auto max-w-[1000px]">
        <div className="mt-5">
          <input
            type="text"
            placeholder="Title"
            className="text-4xl outline-none w-full mt-[3rem]"
          />
          <ReactQuill
            theme="bubble"
            value={description}
            onChange={setDescription}
            placeholder="Write your new blog..."
            className="write my-5"
          />
        </div>
        {isOpen && (
          <div>
            <Preview isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className="py-2 px-3 bg-blue-200 hover:bg-blue-100"
        >
          Publish
        </button>
      </section>
    </>
  );
};

export default Write;
