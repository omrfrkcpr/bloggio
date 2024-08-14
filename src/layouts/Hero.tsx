/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from "react";
import AuthModal from "../components/Modals/AuthModal";
import { useSelector } from "react-redux";
import useShowModal from "../hooks/useShowModal";
import { RootState } from "../app/store";
import CustomImage from "../utils/CustomImage";
import CustomButton from "../utils/CustomButton";
import { useNavigate } from "react-router-dom";
import setups from "../helper/setup";

const Hero: React.FC = React.memo(() => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { toggleHeroModal } = useShowModal();
  const navigate = useNavigate();
  const { showHeroModal } = useSelector((store: RootState) => store.modal);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const handleStartClick = useCallback(() => {
    toggleHeroModal();
    navigate("/write");
  }, [toggleHeroModal]);

  return (
    <div className="w-full bg-[#b9d0f0] relative">
      <div
        className={`w-[300px] md:w-[100px] rotate-90 md:rotate-0 absolute -bottom-52 md:-bottom-2 left-0 md:left-[80%] lg:left-[50%]  ${
          isLoaded ? "translate-x-0" : "-translate-x-[120%]"
        } md:transition-none md:translate-x-0 ${
          isLoaded ? "md:translate-y-0" : "md:translate-y-[110%]"
        }`}
      >
        <CustomImage
          src={`${setups.AWS_S3_BASE_URL}pencil.png`}
          alt="pencil"
          className="w-[100px] md:w-[300px]"
        />
      </div>
      <div
        className="h-[300px] md:h-[450px] p-5 flex flex-wrap relative overflow-hidden px-4 md:px-[4rem] justify-center md:justify-start items-center pb-[10rem] md:pb-0 text-center md:text-left max-w-[1600px] mx-auto"
        id="hero"
      >
        <div className="flex flex-col space-y-8 md:space-y-4 w-[400px] md:w-[500px] xl:w-[450px] 2xl:w-auto">
          <div className="md:pe-10">
            <h1
              className="text-3xl md:text-4xl xl:text-6xl text-black"
              data-test="projectSlogan"
            >
              Explore, Learn, Share
            </h1>
            <p
              className="text-sm sm:text-md md:text-lg text-black"
              data-test="projectDesc"
            >
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
          className={`hidden lg:block absolute bottom-5 right-[4rem] xl:right-[8rem] lg:transition-transform lg:duration-[2s] ${
            isLoaded ? "lg:translate-x-0" : "lg:translate-x-[140%]"
          }`}
        >
          <CustomImage
            src={`${setups.AWS_S3_BASE_URL}typewriter.png`}
            alt="typewriter"
            width="320px"
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
    </div>
  );
});

export default Hero;
