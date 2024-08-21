import NewsCard from "./NewsCard";

const NewsList = ({ news }: { news: Article[] }) => {
  // console.log(news);

  return (
    <ul className="flex lg:block my-5 h-auto w-full overflow-auto">
      {news.map((article: Article) => (
        <li key={article?.id}>
          <NewsCard article={article} />
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
