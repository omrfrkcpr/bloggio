import loadingGif from "../../assets/Loading.gif";

const Loading = () => {
  return (
    <div className="fixed inset-0 grid place-items-center bg-white z-30">
      <img src={loadingGif} alt="loading-gif" className="w-[20rem]" />
    </div>
  );
};

export default Loading;
