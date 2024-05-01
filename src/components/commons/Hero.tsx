import pencil from "../../assets/pencil.png";
import machine from "../../assets/machine.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="h-[450px] p-5 relative flex flex-wrap overflow-hidden bg-[#b9d0f0] px-4 md:px-[8rem] justify-center md:justify-start items-center pb-[10rem] md:pb-0 text-center md:text-left"
      id="hero"
    >
      <div className="flex flex-col space-y-8 md:space-y-4 w-[400px] xl:w-auto">
        <div>
          <h1 className="text-3xl md:text-5xl text-black">
            Explore, Learn, Share
          </h1>
          <p className="text-md md:text-lg text-black">
            Follow your curiosity, connect through shared experiences
          </p>
        </div>
        <button className="bg-black text-white px-4 py-1 rounded-[30px] w-[120px] mx-auto md:mx-0">
          Get started
        </button>
      </div>

      <div
        className={`w-[300px] md:w-[100px] rotate-90 md:rotate-0 lg:block absolute -bottom-52 md:bottom-0 left-0 md:left-[60%] transition-transform duration-[3s] ${
          isLoaded ? "translate-x-0" : "-translate-x-[120%]"
        } md:transition-none md:translate-x-0`}
      >
        <img src={pencil} alt="" />
      </div>
      <div className="hidden lg:block absolute bottom-0 right-[5rem]">
        <img src={machine} alt="" width="350px" />
      </div>
    </div>
  );
};

export default Hero;
