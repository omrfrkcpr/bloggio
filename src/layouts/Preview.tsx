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
import { FaCircleCheck } from "react-icons/fa6";
import { RiSave3Fill } from "react-icons/ri";
import CustomImage from "../components/commons/CustomImage";
import CustomButton from "../components/commons/CustomButton";

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
  const [desc, setDesc] = useState<string>(description || "");
  const [publishType, setPublishType] = useState<string>("");
  const [preview, setPreview] = useState({
    categoryId: "",
    title: title || "",
    content: description || "",
    image: "",
    isPublish: true,
  });

  useEffect(() => {
    getBlogData("categories");
  }, []);

  useEffect(() => {
    setDescription(desc);
    setPreview((prev) => ({ ...prev, content: desc }));
  }, [desc, setDescription]);

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

  const handleSubmitNewBlog = async () => {
    try {
      if (
        preview?.title === "" ||
        preview?.content === "" ||
        preview?.categoryId === "" ||
        preview?.image === ""
      ) {
        toastErrorNotify("All fields are required!");
        return;
      }

      if (preview.title.length < 15) {
        toastErrorNotify("Title must be at least 15 letters!");
        return;
      }

      await postBlogData("blogs", { ...preview, content: desc });
      navigate("/");
      setIsOpen(false);
      setPreview({
        categoryId: "",
        title: "",
        content: "",
        image: "",
        isPublish: true,
      });
    } catch (error: any) {
      toastErrorNotify(error.message);
    }
  };

  // console.log(preview);

  return (
    <>
      <section className="absolute inset-0 bg-white z-50">
        <div className="size my-[2rem]">
          <span
            onClick={() => setIsOpen(false)}
            className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer"
          >
            <LiaTimesSolid />
          </span>
          {/* Preview text */}
          <div className="mt-[8rem] flex flex-col lg:flex-row gap-10">
            <div className="flex-[1] mb-[10rem]">
              <h3 className="border-b text-2xl">Blog Preview</h3>
              <div className="mt-7 flex">
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
                <CustomButton
                  click={() => setImgUrl("")}
                  className="text-red-400 border-[1px] border-red-400 ms-2 text-sm px-2 py-1 rounded-full hover:bg-red-300 hover:text-white transition-all duration-300 w-[85px]"
                  title="Clear URL"
                />
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
                  value={desc}
                  onChange={setDesc}
                  placeholder="Write your new blog*..."
                  className="py-3 border-b border-gray-300"
                />
                <p className="text-gray-500 text-sm  pt-4">
                  <span className="font-bold">NOTE:</span> Changes here will
                  affect how your blog appears in public places like Bloggio's
                  homepage and in subscribers' inboxes - not the contents of the
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
                    setPreview({ ...preview, categoryId: e.target.value });
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
                <CustomButton
                  click={() => setShow(true)}
                  className="border border-green-500 hover:bg-green-500 text-sm px-2 py-1 rounded-full text-green-500 hover:text-white transition-all duration-300"
                  title="New Category"
                />
              </div>
              <div className="flex gap-3 items-center mt-5 pt-5 border-t border-gray-400">
                <div
                  onClick={() => {
                    setPublishType("draft");
                    setPreview({ ...preview, isPublish: false });
                  }}
                  className={`flex-[1] text-md flex h-[220px] flex-col gap-5 justify-start items-center border hover:border-black p-4 cursor-pointer ${
                    publishType === "draft" ? "border-black" : "border-gray-300"
                  }`}
                >
                  <p className="py-1 flex items-center justify-center text-md !text-white !rounded-full !w-[150px] bg-red-300 hover:bg-red-200 relative">
                    Draft{" "}
                    {publishType === "draft" && (
                      <FaCircleCheck
                        color="green"
                        className="bg-white rounded-full absolute right-2"
                      />
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Draft : </span> A draft is a
                    preliminary version of your blog post. It is saved privately
                    and can be edited at any time. It is not visible to the
                    public until you choose to publish it.
                  </p>
                </div>
                <div
                  onClick={() => {
                    setPreview({ ...preview, isPublish: true });
                    setPublishType("publish");
                  }}
                  className={`flex-[1] text-md flex h-[220px] flex-col gap-5 justify-start items-center border hover:border-black p-4 cursor-pointer ${
                    publishType === "publish"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <p className="py-1 flex items-center justify-center text-md !w-[150px] !text-white !rounded-full bg-blue-400 hover:bg-blue-300 relative">
                    Publish Now{" "}
                    {publishType === "publish" && (
                      <FaCircleCheck
                        color="green"
                        className="bg-white rounded-full absolute right-2"
                      />
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Publish Now: </span> Publishing
                    makes your blog post visible to the public. Once published,
                    readers can view and interact with your content.{" "}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleSubmitNewBlog()}
                className="border bg-orange-600 hover:bg-orange-400 text-md px-2 py-1 rounded-full text-white transition-all duration-300 w-[150px] ms-auto mt-10 me-5 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-[30px]">
                    <CustomImage src={spinner} alt="loading-spinner" />
                  </div>
                ) : (
                  "Save"
                )}{" "}
                {!loading && <RiSave3Fill />}
              </button>
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
        transition-all duration-500 border-1 border-black`}
          >
            <CustomButton
              click={() => setShow(false)}
              className="absolute right-5 top-5 text-black hover:text-gray-600"
              icon={<LiaTimesSolid />}
            />
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category Name"
              className="border-b-[1px] border-gray-400 w-full mt-5 outline-none text-md"
            />
            <CustomButton
              click={handleAddCategory}
              className="bg-blue-200 py-1 px-2 mt-5 mx-auto hover:bg-blue-100 w-[105px] text-sm"
              title="Add Category"
            />
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default Preview;
