import React, { useEffect, useState, useCallback } from "react";
import pencil from "../assets/pencil.png";
import typewriter from "../assets/typewriter.png";
import AuthModal from "../components/Modals/AuthModal";
import { useSelector } from "react-redux";
import useShowModal from "../hooks/useShowModal";
import { RootState } from "../app/store";
import usePath from "../hooks/usePath";
import CustomImage from "../utils/CustomImage";
import CustomButton from "../utils/CustomButton";

const Hero: React.FC = React.memo(() => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { toggleHeroModal } = useShowModal();
  const { showHeroModal } = useSelector((store: RootState) => store.modal);
  const [isLoaded, setIsLoaded] = useState(false);
  const { getNavigatePath } = usePath();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const handleStartClick = useCallback(() => {
    toggleHeroModal();
    getNavigatePath("/write");
  }, [toggleHeroModal, getNavigatePath]);

  return (
    <div
      className="h-[300px] md:h-[450px] p-5 relative flex flex-wrap overflow-hidden bg-[#b9d0f0] px-4 md:px-[8rem] justify-center md:justify-start items-center pb-[10rem] md:pb-0 text-center md:text-left"
      id="hero"
    >
      <div className="flex flex-col space-y-8 md:space-y-4 w-[400px] xl:w-auto">
        <div>
          <h1
            className="text-3xl md:text-5xl text-black"
            data-test="projectSlogan"
          >
            Explore, Learn, Share
          </h1>
          <p className="text-md md:text-lg text-black" data-test="projectDesc">
            Follow your curiosity, connect through shared experiences
          </p>
        </div>
        {!currentUser && (
          <CustomButton
            click={handleStartClick}
            className="bg-black hover:bg-black/70 text-white px-4 py-1 rounded-[30px] w-[120px] mx-auto md:mx-0"
            title="Start writing"
            alt="startWriting"
          />
        )}
      </div>
      <div
        className={`w-[300px] md:w-[100px] rotate-90 md:rotate-0 absolute -bottom-52 md:bottom-0 left-0 md:left-[70%] lg:left-[50%] transition-transform duration-[3s] ${
          isLoaded ? "translate-x-0" : "-translate-x-[120%]"
        } md:transition-none md:translate-x-0 md:transition-transform md:duration-[2s] ${
          isLoaded ? "md:translate-y-0" : "md:translate-y-[110%]"
        }`}
      >
        <img
          src={pencil}
          alt="pencil"
          className="w-[100px] md:w-[300px]"
          loading="lazy"
          data-test="pencil"
        />
      </div>
      <div
        className={`hidden lg:block absolute bottom-5 right-[4rem] xl:right-[8rem] lg:transition-transform lg:duration-[2s] ${
          isLoaded ? "lg:translate-x-0" : "lg:translate-x-[140%]"
        }`}
      >
        <CustomImage
          src={typewriter}
          alt="typewriter"
          width="320px"
          loading="lazy"
        />
      </div>
      {showHeroModal && (
        <AuthModal
          isOpen={showHeroModal}
          setIsOpen={toggleHeroModal}
          selectedFormType="sign up"
        />
      )}
    </div>
  );
});

export default Hero;
