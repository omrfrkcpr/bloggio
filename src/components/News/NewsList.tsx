import NewsCard from "./NewsCard";

const NewsList = ({ news }: { news: Article[] }) => (
  <ul className="my-5 h-auto max-h-[680px] overflow-auto">
    {news.map((article: Article) => (
      <NewsCard key={article.url} {...article} />
    ))}
  </ul>
);
export default NewsList;
