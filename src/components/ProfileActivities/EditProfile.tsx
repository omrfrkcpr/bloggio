/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LiaTimesSolid } from "react-icons/lia";
import CustomModal from "../Modals/CustomModal";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import useAuthCalls from "../../hooks/useAuthCalls";
import { useSelector } from "react-redux";

const EditProfile = ({
  editModal,
  setEditModal,
}: {
  editModal: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const { currentUser } = useSelector((state: any) => state.auth);
  const [imgUrl, setImgUrl] = useState(currentUser?.image || "");
  const { updateUser } = useAuthCalls();
  const [usernameLength, setUsernameLength] = useState(0);
  const [bioLength, setBioLength] = useState(0);

  console.log(currentUser);

  const openFile = () => {
    imgRef?.current?.click();
  };

  const btn =
    "border border-green-600 py-2 px-5 rounded-full transition-all duration-200";

  return (
    <CustomModal modal={editModal} hidden="" setModal={setEditModal}>
      <div className="center w-[95%] md:w-[45rem] bg-white mx-auto shadows my-[1rem] z-20 mb-[3rem] p-[2rem]">
        {/* head */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Profile Information</h2>
          <button onClick={() => setEditModal(false)} className="text-xl">
            <LiaTimesSolid />
          </button>
        </div>
        {/* body */}
        <section className="mt-6">
          <p className="pb-2 text-sm text-gray-500 mb-2">Photo</p>
          <div className="flex gap-[2rem]">
            <div className="w-[5rem]">
              {imgUrl ? (
                <img
                  className="h-[5rem] w-[5rem] object-fit border border-gray-400 rounded-full"
                  src={imgUrl}
                  alt="profile-img"
                />
              ) : (
                <Avatar sx={{ minWidth: "5rem", minHeight: "5rem" }} />
              )}

              <input
                onChange={(e) => {
                  if (e?.target?.files) {
                    setImgUrl(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                accept="image/jpg, img/png, image/jpeg, image/JPEG, image/gif"
                ref={imgRef}
                type="file"
                hidden
              />
            </div>
            <div>
              <div className="flex gap-4 text-sm">
                <button
                  onClick={openFile}
                  className="text-green-700 hover:text-green-200"
                >
                  Update
                </button>
                <button className="text-red-700 hover:text-red-200">
                  Remove
                </button>
              </div>
              <p className="w-full sm:w-[20rem] text-gray-500 text-sm pt-2 ">
                Recommended: Square JPG, PNG, or GIF, at least 1,000 Pixels per
                side.
              </p>
            </div>
          </div>
        </section>
        {/* Profile Edit Form*/}
        <section className="pt-[1rem] text-sm">
          <label className="pb-3 block" htmlFor="username">
            Name*
          </label>
          <input
            type="text"
            onChange={(e) => {
              setUsernameLength(e.target.value.length);
            }}
            id="username"
            placeholder="Username..."
            className="p-1 border-b border-black w-full outline-none"
            maxLength={20}
          />
          <p className="text-sm text-gray-600 pt-2 ">
            Appears on your Profile page, as your byline, and in your responses.{" "}
            {usernameLength}/20
          </p>
          <section className="pt-[1rem] text-sm">
            <label className="pb-3 block" htmlFor="bio">
              Bio*
            </label>
            <input
              type="text"
              onChange={(e) => {
                setBioLength(e.target.value.length);
              }}
              id="bio"
              placeholder="Bio..."
              className="p-1 border-b border-black w-full outline-none"
              maxLength={160}
            />
            <p className="text-sm text-gray-600 pt-2 ">
              Appears on your Profile and next to your stories. {bioLength}/160
            </p>
          </section>
        </section>
        {/* Profile Edit Buttons */}
        <div className="flex items-center justify-end gap-4 pt-[2rem]">
          <button
            className={`text-green-600 ${btn} hover:border-green-300 hover:text-green-300`}
          >
            Cancel
          </button>
          <button
            className={`text-white ${btn} bg-green-800 hover:bg-green-300 hover:border-green-300`}
          >
            Save
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default EditProfile;
