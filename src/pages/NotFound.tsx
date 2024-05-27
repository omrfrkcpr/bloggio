import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="absolute inset-0 bg-[#B9D0F0] z-50 grid place-items-center place-content-center gap-4 pb-10 px-5 text-center">
      <img
        src="https://static-00.iconduck.com/assets.00/emoji-sad-icon-2048x2048-edxdqlqa.png"
        alt="404-not-found"
        className="w-[75px] md:w-[150px]"
      />
      <h1 className="text-[100px] md:text-[200px] h-[100px] md:h-[200px] text-gray-200 font-bold flex items-center justify-center">
        404
      </h1>
      <h3 className="text-md md:text-2xl font-bold">
        Sorry, the page you are looking for could not be found or has been
        removed.
      </h3>
      <p className="text-gray-600 text-sm">
        But dont worry, you can find plenty of other things on our homepage.
      </p>
      <Link to="/">
        <button className="bg-[#2563EB] hover:bg-[#2564ebc0] rounded-md text-white/80 font-bold text-sm md:text-md py-1 px-2 md:py-2 md:px-3">
          Back to homepage
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
