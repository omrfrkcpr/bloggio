/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useBlogCalls from "../hooks/useBlogCalls";
import CustomModal from "../components/Modals/CustomModal";
import { LiaTimesSolid } from "react-icons/lia";
import { toastErrorNotify, toastWarnNotify } from "../helper/toastNotify";
import { useNavigate } from "react-router-dom";
import spinner from "../assets/spinner.gif";

const Preview: React.FC<PreviewProps> = ({
  setIsOpen,
  title,
  setTitle,
  description,
  setDescription,
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { categories, loading } = useSelector(
    (state: RootState) => state.blog
  ) as any;
  const navigate = useNavigate();
  const { getBlogData, postBlogData } = useBlogCalls();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [desc, setDesc] = useState<string>("");
  const [preview, setPreview] = useState({
    categoryId: "",
    title: title || "",
    content: description || "",
    image: "",
    isPublish: "",
  });

  useEffect(() => {
    getBlogData("categories");
  }, [categories]);

  useEffect(() => {
    setDescription(desc);
  }, [desc]);

  const handleAddCategory = async () => {
    if (newCategory) {
      await postBlogData("categories", { name: newCategory });
      setSelectedCategory(newCategory);
      setNewCategory("");
      setShow(false);
    } else {
      toastWarnNotify("Please write new category name first.");
    }
  };

  const btn = "px-2 py-1 !w-fit !text-white !rounded-full";

  const handleSubmitNewBlog = () => {
    try {
      if (preview?.title === "" || desc === "" || selectedCategory === "") {
        toastErrorNotify("All fields are required!");
        return;
      }

      if (preview.title.length < 15) {
        toastErrorNotify("Title must be at least 15 letters!");
        return;
      }

      postBlogData("blogs", { ...preview, content: desc });
      navigate("/");
      setIsOpen(false);
      setPreview({
        categoryId: "",
        title: "",
        content: "",
        image: "",
        isPublish: "",
      });
    } catch (error: any) {
      toastErrorNotify(error.message);
    }
  };

  return (
    <>
      <section className="absolute inset-0 bg-white z-30">
        <div className="size my-[2rem]">
          <span
            onClick={() => setIsOpen(false)}
            className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer"
          >
            <LiaTimesSolid />
          </span>
          {/* Preview text */}
          <div className="mt-[8rem] flex flex-col lg:flex-row gap-10">
            <div className="flex-[1]">
              <h3 className="border-b text-2xl">Blog Preview</h3>
              <div className="mt-7">
                <label htmlFor="blogImg">Image URL* :</label>
                <input
                  value={imgUrl}
                  onChange={(e) => {
                    setImgUrl(e.target.value);
                    setPreview({ ...preview, image: e.target.value });
                  }}
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
              <div className="mt-5">
                <input
                  type="text"
                  value={preview?.title}
                  onChange={(e) => {
                    setPreview({ ...preview, title: e.target.value });
                    setTitle(e.target.value);
                  }}
                  placeholder="Title*"
                  className="outline-none w-full border-b border-gray-300 py-2"
                />
                <ReactQuill
                  theme="bubble"
                  value={desc || preview?.content}
                  onChange={setDesc}
                  placeholder="Write your new blog*..."
                  className="py-3 border-b border-gray-300"
                />
                <p className="text-gray-500 text-sm  pt-4">
                  <span className="font-bold">NOTE:</span> Changes here will
                  effect how your blog appears in public places like Bloggio's
                  homepage and in subscribers'inboxed - not the contents of the
                  blog itself.
                </p>
              </div>
            </div>
            <div className="flex-[1] flex flex-col gap-4 mb-5 md:mb-0">
              <h3 className="text-2xl">
                Publishing to:{" "}
                <span className="font-bold capitalize">
                  {currentUser?.firstName} {currentUser?.lastName}
                </span>
              </h3>
              <p className="text-gray-500 text-sm">
                Add or change category of your new blog so readers know what
                your blog is about
              </p>
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setPreview({ ...preview, categoryId: selectedCategory });
                  }}
                  name="categories"
                  id="categories"
                  className="border border-gray-400 p-1"
                >
                  <option hidden>Select Category</option>
                  <option value=""></option>
                  {categories?.map((category: any) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setShow(true)}
                  className="border border-green-500 hover:bg-green-500 text-sm px-2 py-1 rounded-full text-green-500 hover:text-white transition-all duration-300"
                >
                  New Category
                </button>
              </div>
              <div className="flex gap-3 items-center mt-5 pt-5 border-t border-gray-400">
                <button
                  onClick={() => {
                    setPreview({ ...preview, isPublish: "false" });
                    handleSubmitNewBlog();
                  }}
                  className={`${btn} !w-[110px] bg-red-300 hover:bg-red-200`}
                >
                  Draft
                </button>
                <button
                  onClick={() => {
                    setPreview({ ...preview, isPublish: "true" });
                    handleSubmitNewBlog();
                  }}
                  className="px-3 py-1 !w-fit !text-white !rounded-full bg-blue-400 hover:bg-blue-300"
                >
                  Publish Now
                </button>
                {!loading && (
                  <div className="w-[30px]">
                    <img src={spinner} alt="loading-spinner" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-5 mt-5">
                <p className="text-sm text-gray-500">
                  <span className="font-bold">Draft : </span> A draft is a
                  preliminary version of your blog post. It is saved privately
                  and can be edited at any time. It is not visible to the public
                  until you choose to publish it.
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-bold">Publish : </span> Publishing makes
                  your blog post visible to the public. Once published, readers
                  can view and interact with your content.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {show! && (
        <div
          onClick={() => setShow(false)}
          className="bg-black/20 fixed inset-0 z-40"
        />
      )}
      {show && (
        <CustomModal modal={show} setModal={setShow} hidden="">
          <div
            className={`flex-[1] max-w-[400px] shadow-xl p-[2rem] z-50
        absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[18rem] bg-white 
        ${show ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"}
        transition-all duration-500`}
          >
            <div className="absolute right-5 top-5">
              <button onClick={() => setShow(false)}>
                <LiaTimesSolid />
              </button>
            </div>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
              className="border-b-[1px] border-gray-400 w-full mt-5 outline-none text-lg"
            />
            <button
              onClick={handleAddCategory}
              className="bg-blue-200 py-1 px-2 mt-5 mx-auto hover:bg-blue-100"
            >
              Add Category
            </button>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default Preview;
