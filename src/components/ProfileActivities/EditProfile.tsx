/* eslint-disable @typescript-eslint/no-unused-vars */
import { LiaTimesSolid } from "react-icons/lia";
import CustomModal from "../Modals/CustomModal";
import { Dispatch, SetStateAction } from "react";

const EditProfile = ({
  editModal,
  setEditModal,
}: {
  editModal: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <CustomModal hidden="" setModal={setEditModal}>
      <div className="center w-[95%] md:w-[45rem] bg-white mx-auto shadows my-[1rem] z-20 mb-[3rem] p-[2rem]">
        {/* head */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Profile Information</h2>
          <button className="text-xl">
            <LiaTimesSolid />
          </button>
        </div>
        {/* body */}
        <section className="mt-6">
          <p className="pb-2 text-sm text-gray-500">Photo</p>
        </section>
        {/* foot */}
      </div>
    </CustomModal>
  );
};

export default EditProfile;
