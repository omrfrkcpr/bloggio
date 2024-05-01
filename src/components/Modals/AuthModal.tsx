import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";

interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, setIsOpen }) => {
  const [formType, setFormType] = useState("register");

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={handleOuterClick}
          className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-white bg-opacity-80"
        >
          <div className="bg-white rounded-lg p-8 w-full h-[100vh] md:max-h-[700px] max-w-[650px] xl:max-w-[700px] relative shadow-md shadow-black/20">
            <div className="absolute right-8">
              <button onClick={handleClose}>
                <IoCloseOutline
                  size={26}
                  className="opacity-100 hover:opacity-50"
                />
              </button>
            </div>
            <div className="flex flex-col justify-evenly items-center h-full">
              <h2 className="text-3xl mb-4">
                {formType === "login" ? "Welcome Back" : "Join Bloggio"}
              </h2>
              <div className="text-center flex flex-col space-y-6">
                {formType === "register" ? <RegisterForm /> : <LoginForm />}
                <span>
                  {formType === "register"
                    ? "Already have an account?"
                    : "No account?"}{" "}
                  <button
                    onClick={() =>
                      setFormType(
                        `${formType === "login" ? "register" : "login"}`
                      )
                    }
                  >
                    {formType === "register" ? "Sign in" : "Sign up"}
                  </button>
                </span>
              </div>
              <p className="text-sm opacity-50 w-[500px] text-center">
                Click “{formType === "register" ? "Sign up" : "Sign ip"}” to
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
