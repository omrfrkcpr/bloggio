import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toastSuccessNotify } from "../helper/toastNotify";
import setups from "../helper/setup";
import CustomImage from "../utils/CustomImage";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getDataFromUrl = async () => {
      const queryParams = new URLSearchParams(location.search);
      const userParam = queryParams.get("user");
      const parsedData = JSON.parse(decodeURIComponent(userParam ?? ""));
      dispatch(loginSuccess(parsedData));

      setTimeout(() => {
        toastSuccessNotify(parsedData.message);
        navigate("/");
      }, 3000);
    };
    getDataFromUrl();
  }, []);

  const { serviceName, serviceImage } = getService();

  return (
    <div className="flex items-center flex-col justify-center h-screen gap-4">
      <CustomImage
        src={serviceImage}
        alt={`${serviceName} Auth`}
        className="w-[250px] h-[150px] md:w-[360px] md:h-[200px] lg:w-[500px] lg:h-[280px] object-cover mb-4"
      />
      <div className="text-center w-[90%] md:text-[fit-content]">
        <p className="text-lg md:text-xl font-bold mb-2">
          Successfully authenticated with {serviceName}.
        </p>
        <p className="text-md md:text-lg">Redirecting...</p>
      </div>
      <HashLoader size={40} color="#9bbeef" loading={true} />
    </div>
  );
};

const getService = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const provider = queryParams.get("provider");

  if (provider === "google") {
    return {
      serviceName: "Google",
      serviceImage: `
      ${setups.AWS_S3_BASE_URL}Google-Bloggio-Auth.png`,
    };
  } else {
    return { serviceName: "the social service", serviceImage: "" };
  }
};

export default AuthSuccess;
