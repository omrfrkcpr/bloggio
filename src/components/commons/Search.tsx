import { CiSearch } from "react-icons/ci";
import CustomModal from "../Modals/CustomModal";
import { IoCloseOutline } from "react-icons/io5";

const Search = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const hidden = modal
    ? "visible translate-y-0"
    : "invisible -translate-y-[100%]";

  return (
    <div className="relative">
      <CustomModal hidden={hidden} setModal={setModal}>
        <div className="h-[100px] absolute top-0 w-full bg-white shadow-sm shadow-black/30 flex items-center justify-center">
          <div className="absolute right-5 top-5">
            <button onClick={() => setModal(!modal)}>
              <IoCloseOutline
                size={26}
                className="opacity-100 hover:opacity-50 text-black"
              />
            </button>
          </div>
          <div
            className={`absolute lg:relative left-4  w-[75%] mx-auto ${hidden} transition-all duration-500`}
          >
            <div className="flex items-center gap-1 bg-gray-100 px-2 mb-2 rounded-xl relative mt-[0.5rem] ms-8 md:ms-0 ">
              <span>
                <CiSearch className="text-2xl text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search Blog"
                className="bg-transparent outline-none py-[0.6rem] h-[40px] text-sm w-full text-gray-600"
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default Search;
