import loadingGif from "../../assets/Loading.gif";
import CustomImage from "../../utils/CustomImage";

const Loading = () => {
  return (
    <div className="fixed inset-0 grid place-items-center bg-white z-30">
      <CustomImage src={loadingGif} alt="loading-gif" className="w-[20rem]" />
    </div>
  );
};

export default Loading;
