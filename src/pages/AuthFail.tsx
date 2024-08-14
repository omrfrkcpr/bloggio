import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const AuthFail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // redirect to signin page after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center flex-col justify-center h-screen gap-4">
      <HashLoader size={60} color="#9bbeef" loading={true} />
      <div className="text-center w-[90%] md:text-[fit-content]">
        <p className="text-lg md:text-xl font-bold mb-2">
          Authentication Failed! Redirecting to Homepage...
        </p>
        <p className="text-md md:text-lg">Please try again.</p>
      </div>
    </div>
  );
};

export default AuthFail;
