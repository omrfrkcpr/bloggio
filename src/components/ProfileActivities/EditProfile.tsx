/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LiaTimesSolid } from "react-icons/lia";
import CustomModal from "../Modals/CustomModal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import useAuthCalls from "../../hooks/useAuthCalls";
import { useSelector } from "react-redux";
import CustomImage from "../commons/CustomImage";
import CustomButton from "../commons/CustomButton";

const EditProfile = ({
  editModal,
  setEditModal,
}: {
  editModal: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { updateUser } = useAuthCalls();

  const initialFormData = {
    username: "",
    image: "",
    bio: "",
  };

  const [form, setForm] = useState(initialFormData);

  useEffect(() => {
    if (currentUser) {
      setForm({
        username: currentUser?.username || "",
        image: currentUser?.image || "",
        bio: currentUser?.bio || "",
      });
    } else {
      setForm(initialFormData);
    }
  }, [currentUser]);

  const saveForm = () => {
    const myUser = { ...currentUser };
    delete myUser.password;
    const updatedUser = {
      ...myUser,
      image: form?.image,
      username: form?.username,
      bio: form?.bio,
    };
    console.log("Updated User Data:", updatedUser);
    updateUser(updatedUser);
    setEditModal(false);
  };

  const btn =
    "border border-green-600 p-1 px-3 md:py-2 md:px-5 rounded-full transition-all duration-200";

  return (
    <CustomModal modal={editModal} hidden="" setModal={setEditModal}>
      <div className="center w-[95%] md:w-[45rem] bg-white mx-auto shadows my-[1rem] z-20 mb-[3rem] p-[2rem]">
        {/* head */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Profile Information</h2>
          <CustomButton
            click={() => setEditModal(false)}
            className="text-xl"
            icon={<LiaTimesSolid />}
          />
        </div>
        {/* body */}
        <section className="mt-6">
          <p className="pb-2 text-sm text-gray-500 mb-2">Photo</p>
          <div className="flex justify-start mb-2">
            <label htmlFor="userImg" className="text-sm pb-3">
              Image URL:
            </label>
            <input
              value={form?.image}
              className=" h-[20px] ms-2 border-b-[1.5px] border-black outline-none"
              id="userImg"
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              accept="image/jpg, img/png, image/jpeg, image/JPEG, image/gif"
              type="text"
            />
          </div>
          <div className="flex gap-[2rem]">
            <div className="w-[5rem]">
              {form?.image ? (
                <CustomImage
                  className="min-h-[5rem] min-w-[5rem] object-fit border border-gray-400 rounded-full"
                  src={form?.image}
                  alt="profile-img"
                />
              ) : (
                <Avatar sx={{ minWidth: "5rem", minHeight: "5rem" }} />
              )}
            </div>
            <div>
              <CustomButton
                click={() => setForm({ ...form, image: "" })}
                className="text-red-700 text-sm hover:text-red-300"
                title="Clear URL"
              />
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
            value={form?.username}
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
            }}
            id="username"
            placeholder="Username..."
            className="p-1 border-b border-black w-full outline-none"
            maxLength={20}
          />
          <p className="text-sm text-gray-600 pt-2 ">
            Appears on your Profile page, as your byline, and in your responses.{" "}
            {form?.username.length}/20
          </p>
          <section className="pt-[1rem] text-sm">
            <label className="pb-3 block" htmlFor="bio">
              Bio*
            </label>
            <input
              type="text"
              value={form?.bio}
              onChange={(e) => {
                setForm({ ...form, bio: e.target.value });
              }}
              id="bio"
              placeholder="Bio..."
              className="p-1 border-b border-black w-full outline-none"
              maxLength={160}
            />
            <p className="text-sm text-gray-600 pt-2 ">
              Appears on your Profile and next to your stories.{" "}
              {form?.bio.length}
              /160
            </p>
          </section>
        </section>
        {/* Profile Edit Buttons */}
        <div className="flex items-center justify-end gap-4 pt-[2rem]">
          <CustomButton
            className={`text-green-600 ${btn} hover:border-green-300 hover:text-green-300`}
            click={() => setEditModal(false)}
            title="Cancel"
          />
          <CustomButton
            click={saveForm}
            className={`text-white ${btn} bg-green-800 hover:bg-green-300 hover:border-green-300`}
            title="Save"
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default EditProfile;
