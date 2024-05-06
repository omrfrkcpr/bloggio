import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className="absolute sm:relative right-6 left-4 top-[4rem] sm:-left-2  sm:top-[0.3rem]">
      <div className="flex items-center gap-1 bg-gray-100 px-2 mb-2 rounded-full relative">
        <span>
          <CiSearch className="text-2xl text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search Blog"
          className="bg-transparent outline-none py-[0.6rem] text-sm w-full text-gray-600"
        />
      </div>
    </div>
  );
};

export default Search;
