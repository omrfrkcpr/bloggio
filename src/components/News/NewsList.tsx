import NewsCard from "./NewsCard";

const NewsList = ({ news }: { news: Article[] }) => (
  <ul className="my-5 h-auto overflow-auto">
    {news.map((article: Article) => (
      <li key={article.url}>
        <NewsCard article={article} />
      </li>
    ))}
  </ul>
);
export default NewsList;
