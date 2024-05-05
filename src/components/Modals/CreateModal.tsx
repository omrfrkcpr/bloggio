/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useBlogCalls from "../../hooks/useBlogCalls";
import { IoCloseOutline } from "react-icons/io5";

interface CreateModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, setIsOpen }) => {
  const [category, setCategory] = useState("");
  const { postBlogData } = useBlogCalls();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await postBlogData("categories", { name: category });
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen && setIsOpen(false);
  };

  const handleOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={handleOuterClick}
          className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-white bg-opacity-80"
        >
          <div className="bg-white rounded-lg p-8 w-full h-[100%] overflow-auto md:max-h-[700px] max-w-[650px] xl:max-w-[700px] relative shadow-md shadow-black/20">
            <div className="absolute right-3 top-3">
              <button onClick={handleClose}>
                <IoCloseOutline
                  size={26}
                  className="opacity-100 hover:opacity-50 text-black"
                />
              </button>
            </div>
            <div className="flex flex-col justify-evenly items-center h-full">
              <form onSubmit={handleSubmit}>
                <label htmlFor="category">New Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <button type="submit">Create</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateModal;
