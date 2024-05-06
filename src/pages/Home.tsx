import Hero from "../layouts/Hero";
import Blogs from "../layouts/Blogs";
import Trending from "../layouts/Trending";
import Discover from "../layouts/Discover";

const Home = () => {
  return (
    <div>
      <Hero />
      <Trending />
      <div className="size py-3 md:py-5 lg:py-7 flex flex-col-reverse lg:flex-row gap-[3rem] xl:gap-[7rem]">
        <div className="flex-[1.5]">
          <Blogs />
        </div>
        <div className="flex-[0.5] xl:flex-[0.8] relative">
          <Discover />
        </div>
      </div>
    </div>
  );
};

export default Home;
