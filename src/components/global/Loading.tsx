import setups from "../../helper/setup";
import CustomImage from "../../utils/CustomImage";

const Loading = () => {
  return (
    <div className="fixed inset-0 grid place-items-center bg-white z-30">
      <CustomImage
        src={`${setups.AWS_S3_BASE_URL}Loading.gif`}
        alt="loading-gif"
        className="w-[20rem]"
      />
    </div>
  );
};

export default Loading;
