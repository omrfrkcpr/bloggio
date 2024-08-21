import { useState } from "react";
import ReactQuill from "react-quill";
import Preview from "../layouts/Preview";
import { FaCircleArrowRight } from "react-icons/fa6";
import CustomButton from "../utils/CustomButton";
import toastNotify from "../helpers/toastNotify";

const Write = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleContinueClick = () => {
    if (title || description) {
      setIsOpen(true);
    } else {
      toastNotify(
        "warn",
        "Before continuing, please write content for your new blog."
      );
    }
  };

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
            click={handleContinueClick}
            className={`${
              isOpen && "hidden"
            } flex gap-2 items-center justify-center absolute top-5 z-20 right-0 py-2 px-3 bg-[#76a6e9] text-white hover:text-black hover:bg-[#B9D0F0] rounded-full transition-all duration-500`}
            icon={<FaCircleArrowRight />}
            title="Continue Publishing"
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
            type="Save"
          />
        </div>
      )}
    </>
  );
};

export default Write;
