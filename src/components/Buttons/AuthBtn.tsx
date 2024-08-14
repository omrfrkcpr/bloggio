import { useState } from "react";
import useAuthCalls from "../../hooks/useAuthCalls";
import CustomImage from "../../utils/CustomImage";
import setups from "../../helper/setup";

// Configuration for images
const images = {
  straightLine: `${setups.AWS_S3_BASE_URL}straight-line.png`,
  googleIcon: `${setups.AWS_S3_BASE_URL}gmail.png`,
};

// Reusable Divider Component
const Divider = () => (
  <div className="flex justify-center items-center my-4">
    <CustomImage
      src={images.straightLine}
      alt="divider"
      className="w-[60px] md:w-[100px] opacity-50"
    />
    <p className="text-xs mx-2">or</p>
    <CustomImage
      src={images.straightLine}
      alt="divider"
      className="w-[60px] md:w-[100px] opacity-50"
    />
  </div>
);

// Reusable Auth Button Component
const AuthButton = ({
  provider,
  onClick,
  isSubmitting,
}: {
  provider: string;
  onClick: (provider: string) => void;
  isSubmitting: boolean;
}) => {
  const providerConfigs: Record<
    string,
    { label: string; iconSrc: string; bgColor: string; hoverBgColor: string }
  > = {
    google: {
      label: "Continue with Google",
      iconSrc: images.googleIcon,
      bgColor: "bg-white",
      hoverBgColor: "hover:bg-[#76a9f0]",
    },
  };

  const { label, iconSrc, bgColor, hoverBgColor } = providerConfigs[provider];

  return (
    <button
      className={`py-2 px-5 ${bgColor} border ${hoverBgColor} text-habit-gray duration-300 hover:text-white rounded-full flex justify-center items-center gap-2 disabled:opacity-50`}
      onClick={() => onClick(provider)}
      disabled={isSubmitting}
    >
      <CustomImage
        src={iconSrc}
        alt={`${provider}-icon`}
        className="w-[20px] h-[20px] md:w-[24px] bg-white p-1 rounded-full md:h-[24px]"
      />
      <p className="text-[10px] md:text-[13px]">{label}</p>
    </button>
  );
};

const AuthBtn = () => {
  const { signInWithSocial } = useAuthCalls();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuthClick = async (authType: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await signInWithSocial(authType);
    } catch (error) {
      console.error(`Error signing in with ${authType}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Divider />
      <div className="flex gap-2 md:gap-5 justify-center items-center">
        <AuthButton
          provider="google"
          onClick={handleAuthClick}
          isSubmitting={isSubmitting}
        />
        {/* Add more AuthButtons for other providers here */}
      </div>
    </>
  );
};

export default AuthBtn;
