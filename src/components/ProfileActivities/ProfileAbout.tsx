/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import CustomButton from "../../utils/CustomButton";

const ProfileAbout = ({
  setEditModal,
}: {
  setEditModal: (value: boolean) => void;
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);

  return (
    <div className="w-full">
      <p className="text-2xl first-letter:uppercase">
        {currentUser?.bio || "No bio yet!"}
      </p>
      <CustomButton
        click={() => setEditModal(true)}
        className="border border-black py-2 px-5 rounded-full text-black mt-[3rem] hover:text-gray-600 hover:border-gray-600 w-[80px] grid place-items-center place-content-center ms-auto"
        title="Edit"
      />
    </div>
  );
};

export default ProfileAbout;
