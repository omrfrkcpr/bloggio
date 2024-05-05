/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import CreateModal from "../components/Modals/CreateModal";

const Write = () => {
  const [title, setTitle] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<string>("");
  const [imageText, setImageText] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState("");
  const { categories } = useSelector((state: RootState) => state.blog) as any;
  const { getBlogData, postBlogData } = useBlogCalls();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getBlogData("categories");
  }, []);

  function handleTitle(e: any) {
    const newTitle = e.target.value;
    setTitle(newTitle);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const newBlog = {
      categoryId: categoryName,
      title: title,
      content: content,
      image: imageUrl,
      isPublish: true,
    };

    await postBlogData("blogs", newBlog);

    setContent("");
    setTitle("");
    setCategoryName("");
    setImageUrl("");
    setShowPreview(false);
  }

  const checkAllFields = () => {
    title && categoryName && content && imageUrl ? setShowPreview(true) : null;
  };

  useEffect(() => {
    checkAllFields();
  }, [title, categoryName, content, imageUrl]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setImageFile(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    setImageText(event.target.value);
  };

  const handleResetImage = () => {
    if (imageFile) {
      setImageFile("");
    } else if (imageText) {
      setImageText("");
    }
    setImageUrl("");
  };

  //Custom Tool Bar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "color", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
    "color",
  ];
  return (
    <>
      <div className="min-h-[86.5vh] h-auto w-[90%] mx-auto max-w-[1000px]">
        <h2 className="text-4xl text-center font-semibold py-4 mt-5">
          Get Started on Your New Blog
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-4">
          {/* Blog Editor */}
          <div className="w-full max-w-3xl p-5 my-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
            <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
              Blog Editor
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
                  >
                    Blog Title
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleTitle}
                      type="text"
                      value={title}
                      name="title"
                      id="title"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B9D0F0] sm:text-sm sm:leading-6"
                      placeholder="Type the Course title"
                    />
                  </div>
                </div>
                {/* Image */}
                <div>
                  <input
                    type="text"
                    value={imageText}
                    onChange={handleImageUrlChange}
                    placeholder="Enter image URL..."
                    required={!imageUrl}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!imageUrl}
                  />
                  {imageFile && (
                    <div>
                      <img
                        src={imageFile}
                        alt="Uploaded"
                        style={{ maxWidth: "100%", marginTop: "10px" }}
                      />
                    </div>
                  )}
                  <button onClick={handleResetImage}>Reset</button>
                </div>
                {/* Category */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Blog Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                    }}
                  >
                    {categories.map((cat: any) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => setIsOpen(true)}>
                    Create Category
                  </button>
                </div>
                {/* Content */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="content"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Blog Content
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#5594eb] rounded-lg focus:ring-4 focus:ring-blue-600 dark:focus:ring-blue-900 hover:bg-[#a7c4ed]"
              >
                <FaPlus className="w-5 h-5 mr-2" />
                <span>Publish</span>
              </button>
              <button onClick={() => setShowPreview(!showPreview)}>
                Preview
              </button>
            </form>
          </div>

          {/* Blog View */}
          {showPreview && (
            <div className=" blog-view w-full max-w-3xl p-8 my-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
              <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
                Preview
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Title */}
                <div className="sm:col-span-2">
                  <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
                    Blog Title
                  </h2>
                  <div className="mt-2">
                    <p className="text-2xl font-bold">{title}</p>
                  </div>
                </div>
                {/* Image */}
                {imageFile && (
                  <div>
                    <img
                      src={imageFile}
                      alt="Uploaded"
                      style={{ maxWidth: "100%", marginTop: "10px" }}
                    />
                  </div>
                )}
                {/* Category */}
                <div className="sm:col-span-2">
                  <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Blog Category
                  </h2>
                  <p>{categoryName}</p>
                </div>
                <div className="sm:col-span-full">
                  <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Blog Content
                  </h2>
                  {parse(content)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && <CreateModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default Write;
