/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import ReactQuill from "react-quill";
import Preview from "../layouts/Preview";
import { FaCircleArrowRight } from "react-icons/fa6";
import { toastWarnNotify } from "../helper/toastNotify";

const Write = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <>
      <section className="min-h-[86.8vh] h-auto w-[90%] md:w-[80%] mx-auto max-w-[1000px] relative">
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
        <button
          onClick={() => {
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
          } flex gap-2 items-center justify-center absolute top-5 z-50 right-0 py-2 px-3 bg-[#76a6e9] text-white hover:text-black hover:bg-[#B9D0F0] rounded-full transition-all duration-500`}
        >
          <span>Continue Publishing</span>
          <FaCircleArrowRight />
        </button>
      </section>
      {isOpen && (
        <div>
          <Preview
            setIsOpen={setIsOpen}
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
          />
        </div>
      )}
    </>
  );
};

export default Write;
