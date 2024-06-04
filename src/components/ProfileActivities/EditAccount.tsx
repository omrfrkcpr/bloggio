/* eslint-disable @typescript-eslint/no-explicit-any */
import { LiaTimesSolid } from "react-icons/lia";
import CustomModal from "../Modals/CustomModal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAuthCalls from "../../hooks/useAuthCalls";
import { useSelector } from "react-redux";
import CustomButton from "../commons/CustomButton";
import { MdOutlineArrowOutward } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { toastErrorNotify } from "../../helper/toastNotify";
import useBlogCalls from "../../hooks/useBlogCalls";

const EditAccount = ({
  editModal,
  setEditModal,
  setEditProfileModal,
}: {
  editModal: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
  setEditProfileModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { deleteBlogData } = useBlogCalls();
  const { updateUser } = useAuthCalls();

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const [form, setForm] = useState(initialFormData);
  const [fieldToEdit, setFieldToEdit] = useState<{
    field: string;
    value: string;
    text: string;
  } | null>(null);

  useEffect(() => {
    if (currentUser) {
      setForm({
        firstName: currentUser?.firstName || "",
        lastName: currentUser?.lastName || "",
        email: currentUser?.email || "",
      });
    } else {
      setForm(initialFormData);
    }
  }, [currentUser]);

  const handleDeleteAccount = async () => {
    const { _id } = currentUser;
    await deleteBlogData("users", _id);
    setEditProfileModal(false);
  };

  const validateForm = () => {
    if (!form.email.includes("@")) {
      toastErrorNotify("Invalid email address");
      return false;
    }
    // Add other validation checks as needed
    return true;
  };

  const saveForm = () => {
    if (!validateForm()) {
      return;
    }

    const myUser = { ...currentUser };
    delete myUser.password;
    const updatedUser = {
      ...myUser,
      firstName: form?.firstName,
      lastName: form?.lastName,
      email: form?.email,
    };
    console.log("Updated User Data:", updatedUser);
    updateUser(updatedUser);
    setEditModal(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
    setFieldToEdit(null);
  };

  const handleEditClick = (field: string, value: string, text: string) => {
    setFieldToEdit({ field, value, text });
  };

  const getFieldLabel = (field: string) => {
    switch (field) {
      case "firstName":
        return "First Name";
      case "lastName":
        return "Last Name";
      case "email":
        return "Email Address";

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

  const btn =
    "border border-green-600 p-1 px-3 md:py-2 md:px-5 rounded-full transition-all duration-200";

  return (
    <>
      <CustomModal modal={editModal} hidden="" setModal={setEditModal}>
        <div className="center w-[95%] md:w-[45rem] bg-white mx-auto shadows my-[1rem] z-10 mb-[3rem] p-[2rem]">
          {/* head */}
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Account Settings</h2>
            <CustomButton
              click={() => setEditModal(false)}
              className="text-xl"
              icon={<LiaTimesSolid />}
            />
          </div>
          {/* body */}
          <section className="mt-6 md:w-[80%] border-b border-gray-300 py-2">
            {Object.keys(form).map((key) => (
              <div className="flex justify-between mb-2" key={key}>
                <p className="text-[12px] md:text-sm pb-3">
                  {getFieldLabel(key)}
                </p>
                <CustomButton
                  click={() =>
                    handleEditClick(
                      key,
                      form[key as keyof typeof form],
                      getFieldText(key)
                    )
                  }
                  className="text-gray-500 hover:text-black text-[12px] md:text-sm"
                  title={form[key as keyof typeof form]}
                />
              </div>
            ))}
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
          {/* Profile Edit Form*/}
          <section className="pt-[1rem] text-[12px] md:text-sm md:w-[80%]">
            <div className="flex flex-col justify-between mb-2 leading-[1rem]">
              <CustomButton
                click={() => {}}
                className="text-red-300 hover:text-red-600 text-[12px] md:text-sm"
                title="Change Password"
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
              />
              <p className="text-[10px] md:text-[12px] text-gray-600 ">
                Permanently delete your account and all of your content.
              </p>
            </div>
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

      {fieldToEdit && (
        <CustomModal
          modal={!!fieldToEdit}
          hidden=""
          setModal={() => setFieldToEdit(null)}
        >
          <div className="center w-[95%] md:w-[720px] md:h-[485px] bg-white mx-auto shadows my-[1rem] z-10 mb-[3rem] p-[2rem] flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-xl mb-10 text-center">
                Edit {getFieldLabel(fieldToEdit.field)}
              </h2>
              <TextField
                label={getFieldLabel(fieldToEdit.field)}
                variant="outlined"
                fullWidth
                value={fieldToEdit.value}
                onChange={(e) =>
                  setFieldToEdit({ ...fieldToEdit, value: e.target.value })
                }
              />
              <p className="text-[12px] md:text-sm text-gray-500 mt-2">
                {fieldToEdit.text}
              </p>
            </div>
            <div className="flex items-center justify-end gap-4 pt-6">
              <CustomButton
                className={`text-green-600 ${btn} hover:border-green-300 hover:text-green-300`}
                click={() => setFieldToEdit(null)}
                title="Cancel"
              />
              <CustomButton
                click={() =>
                  handleFieldChange(fieldToEdit.field, fieldToEdit.value)
                }
                className={`text-white ${btn} bg-green-800 hover:bg-green-300 hover:border-green-300`}
                title="Save"
              />
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default EditAccount;
