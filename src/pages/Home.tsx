import Hero from "../layouts/Hero";
import Blogs from "../layouts/Blogs";
import Trending from "../layouts/Trending";

const Home = () => {
  return (
    <div>
      <Hero />
      <Trending />
      <Blogs />
    </div>
  );
};

export default Home;
