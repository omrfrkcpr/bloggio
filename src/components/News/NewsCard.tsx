/* eslint-disable @typescript-eslint/no-unused-vars */

import { formatPublish } from "../../helper/functions";
import CustomImage from "../../utils/CustomImage";

const NewsCard = ({ article }: { article: Article }) => {
  const { author, source, title, url, image, published_at } = article;

  console.log(image);
  return (
    <div className="w-[100%] h-[140px] flex">
      <div>
        <p className="text-sm">{source}</p>
        <h3>{title}</h3>
        <p>{author}</p>
      </div>
      <div>
        <CustomImage
          src={
            image ||
            "https://archive.org/download/placeholder-image/placeholder-image.jpg"
          }
          alt="article-image"
          className="w-[170px] h-[70px] object-cover"
        />
        <p>{formatPublish(published_at || "")}</p>
      </div>
    </div>
  );
};

export default NewsCard;
