/* eslint-disable @typescript-eslint/no-unused-vars */

import { formatPublish, shortenText } from "../../helper/functions";
import CustomImage from "../../utils/CustomImage";
import { FaUserAlt } from "react-icons/fa";

const NewsCard = ({ article }: { article: Article }) => {
  const { author, title, url, image, publish_date, text } = article;

  // console.log(article);

  const handleClick = () => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-[170px] flex cursor-pointer border-b border-gray-300 py-3 text-black hover:text-gray-500 gap-2"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold">{shortenText(title, 5)}</h3>
        <p className="text-xs">
          {shortenText(text || "No content available", 15)}
        </p>
        <p className="text-xs flex gap-1 items-center justify-start">
          <FaUserAlt />
          <span>{`${
            !author
              ? "No Author"
              : author.length > 25
              ? author.slice(0, 25) + "..."
              : author
          }`}</span>
        </p>
      </div>
      <div className="text-center w-[220px] h-full">
        <CustomImage
          src={
            image ||
            "https://archive.org/download/placeholder-image/placeholder-image.jpg"
          }
          alt="article-image"
          className="w-full h-auto object-fit"
        />
        <p className="font-bold text-xs mx-auto">
          {formatPublish(publish_date || "")}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
