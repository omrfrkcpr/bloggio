/* eslint-disable @typescript-eslint/no-explicit-any */
import { CiSearch } from "react-icons/ci";
import CustomModal from "../Modals/CustomModal";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Search = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [search, setSearch] = useState("");
  const { blogs } = useSelector((state: RootState) => state.blog);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const hidden = modal
    ? "visible translate-y-0"
    : "invisible -translate-y-[100%]";

  const searchData =
    blogs &&
    blogs.filter((blog: any) =>
      blog?.title.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <CustomModal hidden={hidden} modal={modal} setModal={setModal}>
        <div
          className={`absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0
          ${
            modal
              ? "visible opacity-100"
              : "invisible sm:visible sm:opacity-100 opacity-0"
          }
          transition-all duration-100`}
        >
          <div
            ref={searchRef}
            className="flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10 me-2"
          >
            <span className="text-2xl text-gray-400">
              <CiSearch />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none py-[0.5rem] text-sm w-full text-black"
              type="text"
              placeholder="Search Blog..."
            />
            {search && (
              <div className="absolute right-0 left-0 top-full bg-white shadow rounded-sm">
                {searchData.length > 0 ? (
                  <>
                    {searchData.slice(0, 5).map((blog: any, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          navigate(`/blog/${blog?._id}`);
                          setSearch("");
                        }}
                        className="p-2 hover:text-gray-700 cursor-pointer text-black"
                      >
                        <h2 className="line-clamp-1 capitalize text-sm ">
                          {blog.title}
                        </h2>
                        <div
                          className="text-xs text-gray-500 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: blog.desc }}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-gray-500 p-3">No Blog Found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default Search;
