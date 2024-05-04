/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Register from "../../pages/Register";
import Login from "../../pages/Login";

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  setIsOpen,
  selectedFormType,
}) => {
  const [formType, setFormType] = useState(selectedFormType || "sign in");

  const handleClose = () => {
    setIsOpen && setIsOpen(false);
  };

  const handleOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const formText = () => (formType === "sign up" ? "sign up" : "sign in");
  const formTextReverse = () =>
    formType === "sign up" ? "sign in" : "sign up";

  return (
    <>
      {isOpen && (
        <div
          onClick={handleOuterClick}
          className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-white bg-opacity-80"
        >
          <div className="bg-white rounded-lg p-8 w-full h-[100%] overflow-auto md:max-h-[700px] max-w-[650px] xl:max-w-[700px] relative shadow-md shadow-black/20">
            <div className="absolute right-3 top-3">
              <button onClick={handleClose}>
                <IoCloseOutline
                  size={26}
                  className="opacity-100 hover:opacity-50 text-black"
                />
              </button>
            </div>
            <div className="flex flex-col justify-evenly items-center h-full">
              <h2 className="text-2xl lg:text-3xl mb-4 text-black">
                {formType === "sign in" ? "Welcome Back" : "Join Bloggio"}
              </h2>
              <div className="text-center flex flex-col space-y-6">
                {formType === "sign up" ? <Register /> : <Login />}
                <span className="text-black">
                  {formType === "sign up"
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    className="text-green-900 hover:underline font-bold capitalize"
                    onClick={() => setFormType(formTextReverse())}
                  >
                    {formTextReverse()}
                  </button>
                </span>
              </div>
              <p className="text-xs md:text-[0.9rem] lg:leading-6 opacity-50 w-[90%] max-w-[500px] text-center text-black">
                Click “<span className="capitalize">{formText()}</span>” to
                agree to Bloggio’s{" "}
                <span className="underline">Terms of Service</span> and
                acknowledge that Bloggio’s{" "}
                <span className="underline">Privacy Policy</span> applies to
                you.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
