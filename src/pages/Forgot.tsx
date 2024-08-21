import { useState } from "react";
import NearMeIcon from "@mui/icons-material/NearMe";

import useAuthCalls from "../hooks/useAuthCalls";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import toastNotify from "../helpers/toastNotify";

const Forgot = () => {
  const [email, setEmail] = useState<string>("");
  const { forgotPassword } = useAuthCalls();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleForgotSubmit = () => {
    if (email) {
      forgotPassword(email);
      setEmail("");
    } else {
      toastNotify("info", "Please enter your email");
    }
  };

  return (
    <div className="page-height z-50 relative">
      <div className="absolute w-full top-[35%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center">
        <form className="flex flex-col justify-center text-center w-[320px] md:w-[500px] p-5 h-auto md:h-[300px] rounded-xl">
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold">
              Forgot Password
            </h2>
            <p className="text-xs md:text-md lg:text-[14px] xl:text-[16px] mt-2 mb-3 font-light md:font-normal">
              Please enter your email address to reset your password. You will
              receive a link to create a new password via email.
            </p>
          </div>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            className="my-4 px-2 py-1 outline-none rounded-md md:mx-4 border text-[13px] md:text-[16px]"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            onClick={handleForgotSubmit}
            disabled={loading}
            className="py-1 px-2 md:py-2 md:px-3 bg-[#b9d0f0] hover:bg-[#ccdcf2] rounded-xl w-[100px] md:w-[120px] text-[12px] md:text-[14px] lg:text-[16px] h-[28px] md:h-[32px] grid mx-auto place-content-center place-items-center"
          >
            {loading ? (
              <NearMeIcon sx={{ color: "black" }} />
            ) : (
              <span>Send</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
