/* eslint-disable @typescript-eslint/no-explicit-any */
import { LiaTimesSolid } from "react-icons/lia";
import CustomModal from "../../utils/CustomModal";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../utils/CustomButton";
import { MdOutlineArrowOutward } from "react-icons/md";

const EditAccountModal = ({
  editModal,
  setEditModal,
  setEditProfileModal,
  form,
  setFieldToEdit,
  handleDeleteAccount,
  saveForm,
  setPasswordModal,
}: {
  editModal: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
  setEditProfileModal: Dispatch<SetStateAction<boolean>>;
  form: User;
  setFieldToEdit: Dispatch<SetStateAction<any>>;
  handleDeleteAccount: () => void;
  saveForm: () => void;
  setPasswordModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);

  const btn =
    "border border-green-600 p-1 px-3 md:py-2 md:px-5 rounded-full transition-all duration-200";

  const getFieldLabel = (field: string) => {
    switch (field) {
      case "firstName":
        return "First Name";
      case "lastName":
        return "Last Name";
      case "email":
        return "Email Address";
      case "password":
        return "Password";
      default:
        return field;
    }
  };

  const getFieldText = (field: string) => {
    switch (field) {
      case "firstName":
        return "Enter your first name between 2 and 50 letters.";
      case "lastName":
        return "Enter your last name between 2 and 50 letters.";
      case "email":
        return "You can sign into Bloggio with this email address.";
      case "password":
        return "Your password must be at least 8, maximum 50 characters. It should contain at least one number, one lowercase, one uppercase, also contain at least one of the following characters: (@$?!%&*)";
      default:
        return "";
    }
  };

  const handleEditClick = (field: string, value: string, text: string) => {
    setFieldToEdit({ field, value, text });
  };

  return (
    <CustomModal modal={editModal} hidden="" setModal={setEditModal}>
      <div
        className="center w-[95%] md:w-[45rem] bg-white mx-auto shadows my-[1rem] z-10 mb-[3rem] p-[2rem]"
        data-test="edit-account-modal"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Account Settings</h2>
          <CustomButton
            click={() => setEditModal(false)}
            className="text-xl"
            icon={<LiaTimesSolid />}
          />
        </div>
        <section className="mt-6 border-b border-gray-300 py-2">
          {Object.keys(form).map(
            (key) =>
              key !== "password" &&
              key !== "confirmPassword" && (
                <div className="flex justify-between mb-2" key={key}>
                  <p className="text-[12px] md:text-sm pb-3">
                    {getFieldLabel(key)}
                  </p>
                  <CustomButton
                    click={() =>
                      handleEditClick(
                        key,
                        form[key as keyof typeof form] || "",
                        getFieldText(key)
                      )
                    }
                    className="text-gray-500 hover:text-black text-[12px] md:text-sm"
                    title={form[key as keyof typeof form] || ""}
                    alt={`edit-${key}`}
                  />
                </div>
              )
          )}
          <div className="flex justify-between items-center mb-2">
            <div className="leading-[1rem]">
              <p className="text-[12px] md:text-sm">Profile Information</p>
              <p className="text-[10px] md:text-[12px] text-gray-500">
                Edit your photo, name, bio, etc.
              </p>
            </div>
            <div
              className="flex justify-center items-center gap-1 cursor-pointer text-gray-500 hover:text-black"
              onClick={() => setEditProfileModal(true)}
            >
              <CustomButton
                click={() => {}}
                className="text-[12px] md:text-sm"
                title={`${form?.firstName} ${form?.lastName}`}
              />
              <img
                src={currentUser?.image}
                alt=""
                className="w-5 h-5 md:w-7 md:h-7 rounded-full"
              />
              <MdOutlineArrowOutward />
            </div>
          </div>
        </section>
        <section className="pt-[1rem] text-[12px] md:text-sm">
          <div className="flex flex-col justify-between mb-2 leading-[1rem]">
            <CustomButton
              click={() => setPasswordModal(true)}
              className="text-red-300 hover:text-red-600 text-[12px] md:text-sm"
              title="Change Password"
              alt="change-password"
            />
            <p className="text-[10px] md:text-[12px] text-gray-600 ">
              Recommended to change your password every 6 months
            </p>
          </div>
          <div className="flex flex-col justify-between mb-2 mt-5 leading-[1rem]">
            <CustomButton
              click={handleDeleteAccount}
              className="text-red-300 hover:text-red-600 text-[12px] md:text-sm"
              title="Delete Account"
              alt="delete-account"
            />
            <p className="text-[10px] md:text-[12px] text-gray-600 ">
              Permanently delete your account and all of your content.
            </p>
          </div>
        </section>
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

export default EditAccountModal;
