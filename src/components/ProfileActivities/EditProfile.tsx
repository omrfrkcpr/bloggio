import { LiaTimesSolid } from "react-icons/lia";
import CustomModal from "../../utils/CustomModal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAuthCalls from "../../hooks/useAuthCalls";
import { useSelector } from "react-redux";
import CustomButton from "../../utils/CustomButton";
import { RootState } from "../../app/store";
import AvatarSection from "./AvatarSection";

const EditProfile = ({
  editModal,
  setEditModal,
}: {
  editModal: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { updateUser } = useAuthCalls();

  const initialFormData = {
    username: "",
    avatar: "",
    bio: "",
  };

  const [form, setForm] = useState(initialFormData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [removeExistingAvatar, setRemoveExistingAvatar] =
    useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setForm({
        username: currentUser?.username || "",
        avatar: currentUser?.avatar || "",
        bio: currentUser?.bio || "",
      });
    } else {
      setForm(initialFormData);
    }
  }, [currentUser]);

  useEffect(() => {
    return () => {
      // Clean up URL object when component unmounts or file is removed
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const handleFileRemove = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setForm((prev) => ({ ...prev, avatar: currentUser?.avatar || "" }));
    setRemoveExistingAvatar(false);
  };

  const handleRemoveExistingAvatar = () => {
    setRemoveExistingAvatar(true);
    setForm((prev) => ({ ...prev, avatar: "" }));
    setSelectedFile(null);
    setFilePreview(null);
  };

  // console.log(form);

  const saveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (form.username !== currentUser?.username) {
      formData.append("username", form?.username || "");
    }

    if (form.bio !== currentUser?.bio) {
      formData.append("bio", form?.bio || "");
    }

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    } else if (removeExistingAvatar) {
      formData.append("avatar", ""); // delete existing avatar
    }

    // console.log("formdata: ", formData);

    await updateUser(formData);
    setEditModal(false);
  };

  const avatarSrc = form.avatar
    ? form.avatar
    : "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg";

  return (
    <CustomModal modal={editModal} hidden="" setModal={setEditModal}>
      <form
        onSubmit={saveForm}
        encType="multipart/form-data"
        className="center w-[95%] md:w-[45rem] bg-white mx-auto shadows my-[1rem] z-20 mb-[3rem] p-[2rem]"
      >
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
        <AvatarSection
          filePreview={filePreview}
          avatarSrc={avatarSrc}
          handleRemoveExistingAvatar={handleRemoveExistingAvatar}
          handleFileRemove={handleFileRemove}
          setSelectedFile={setSelectedFile}
          setFilePreview={setFilePreview}
          selectedFile={selectedFile}
          setProfileForm={setForm}
          setRemoveExistingAvatar={setRemoveExistingAvatar}
        />
        {/* Profile Edit Form*/}
        <section className="pt-[1rem] text-sm">
          <label className="pb-3 block" htmlFor="username">
            Username*
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
            className="text-green-600 btn hover:border-green-300 hover:text-green-300"
            click={() => setEditModal(false)}
            title="Cancel"
          />
          <button
            type="submit"
            className="text-white btn bg-green-800 hover:bg-green-300 hover:border-green-300"
          >
            Save
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default EditProfile;
