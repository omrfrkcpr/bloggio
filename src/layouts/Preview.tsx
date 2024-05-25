import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";

const Preview = ({
  // isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [imgUrl, setImgUrl] = useState<string>("");
  return (
    <section className="absolute inset-0 bg-white z-30">
      <div className="size my-[2rem]">
        <span
          onClick={() => setIsOpen(false)}
          className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer"
        >
          <LiaTimesSolid />
        </span>
        {/* Preview text */}
        <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
          <div className="flex-[1]">
            <h3 className="border-b">Blog Preview</h3>
            <div className="mt-7">
              <label htmlFor="blogImg">Image URL :</label>
              <input
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                type="text"
                id="blogImg"
                className="border-b-[1px] border-gray-400 ms-1 outline-none"
              />
              <button
                onClick={() => setImgUrl("")}
                className="text-red-400 border-[1px] border-red-400 ms-4 text-sm px-2 py-1 rounded-full hover:bg-red-300 hover:text-white transition-all duration-300"
              >
                Clear URL
              </button>
            </div>
            <div className="w-full h-[200px] object-cover bg-gray-100 my-3 flex flex-col items-center justify-center bg-cover bg-no-repeat relative text-gray-400 text-center">
              <span className="underline">Blog Image</span>
              <span className="text-sm">
                Represents your blog content. Recommended to use a rectangular
                PNG, JPG, JPEG or GIF with a size of at least 1000 pixels.
              </span>

              {imgUrl && (
                <img
                  src={imgUrl}
                  alt="blog-img"
                  className="absolute w-full h-full"
                />
              )}
            </div>
          </div>
          <div className="flex-[1]">right</div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
