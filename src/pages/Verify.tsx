import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../components/global/Logo";
import { ThreeDots } from "react-loader-spinner";
import toastNotify from "../helpers/toastNotify";
import { axiosWithPublic } from "../hooks/useAxios";
import useShowModal from "../hooks/useShowModal";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toggleNavbarModal } = useShowModal();
  const [message, setMessage] = useState(
    "Email is being verified, please wait"
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const verifyEmail = async () => {
      setLoading(true);
      try {
        // API request for account verification
        const response = await axiosWithPublic.post(
          `auth/verify-email/${token}`
        );

        // Update message after success verification
        if (response.status === 200) {
          setMessage("Email successfully verified! You're redirecting...");
          toastNotify("success", "Your account successfully verified!");

          setTimeout(() => {
            navigate("/");
            setTimeout(() => {
              toggleNavbarModal();
            }, 1000);
          }, 3000);
        }
      } catch (error) {
        // Update message after failed verification
        setMessage(
          "Failed email verification. Please try again or redirect to homepage!"
        );
        toastNotify("error", "Verification failed due to invalid request");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="absolute w-screen h-screen z-50 ">
      <div className="absolute w-[350px] md:w-[400px] p-2 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center flex flex-col items-center justify-center">
        <div className="max-w-[200px]">
          <Logo />
        </div>
        <p className="text-[10px] md:text-[14px] mt-4 flex gap-2">
          <span className="text-sm md:text-lg text-[#84ade6]">{message}</span>
          {loading && (
            <ThreeDots
              visible={true}
              height="20"
              width="20"
              color="#B9D0F0"
              radius="8"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-[10px] md:text-[14px] lg:text-[16px] py-1 px-2 md:px-3 text-center bg-[#87abde] text-white rounded-xl hover:bg-[#adc7f0] mt-10"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Verify;
