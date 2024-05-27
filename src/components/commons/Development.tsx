import { Link } from "react-router-dom";

const Development = () => {
  return (
    <div className="absolute inset-0 bg-white z-20 grid place-items-center place-content-center gap-4 pb-10 px-5 text-center">
      <img
        src="https://akvopedia.org/s_wiki/images/0/02/Icon_under_development.png"
        alt="404-not-found"
        className="w-[150px] md:w-[300px]"
      />
      <Link to="/">
        <button className="bg-[#2563EB] hover:bg-[#2564ebc0] rounded-md text-white/80 font-bold text-sm md:text-md py-1 px-2 md:py-2 md:px-3">
          Back to homepage
        </button>
      </Link>
    </div>
  );
};
export default Development;
