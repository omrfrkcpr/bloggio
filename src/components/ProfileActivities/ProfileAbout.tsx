/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

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
      <div className="text-right">
        <button
          onClick={() => setEditModal(true)}
          className="border border-black py-2 px-5 rounded-full text-black mt-[3rem] hover:text-gray-600 hover:border-gray-600"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProfileAbout;
