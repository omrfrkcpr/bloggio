import { Dispatch, SetStateAction } from "react";
import CustomModal from "../../utils/CustomModal";
import TextField from "@mui/material/TextField";
import CustomButton from "../../utils/CustomButton";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toastNotify from "../../helpers/toastNotify";

const ChangePasswordModal = ({
  passwordModal,
  setPasswordModal,
  form,
  setForm,
  showPassword,
  togglePasswordVisibility,
  showConfirmPassword,
  toggleConfirmPasswordVisibility,
  saveForm,
}: {
  passwordModal: boolean;
  setPasswordModal: Dispatch<SetStateAction<boolean>>;
  form: User;
  setForm: Dispatch<SetStateAction<User>>;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  showConfirmPassword: boolean;
  toggleConfirmPasswordVisibility: () => void;
  saveForm: () => void;
}) => {
  const handleSaveClick = () => {
    if (form.password !== form.confirmPassword) {
      toastNotify(
        "error",
        "Passwords do not match. Please confirm your password"
      );
      setForm({ ...form, password: "", confirmPassword: "" });
    } else {
      saveForm();
    }
  };

  return (
    <CustomModal modal={passwordModal} hidden="" setModal={setPasswordModal}>
      <div className="center w-[95%] md:w-[720px] md:h-[485px] bg-white mx-auto shadows my-[1rem] z-10 mb-[3rem] p-[2rem] flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl mb-10 text-center">
            Change Password
          </h2>
          <div className="relative mb-3">
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span
              className="absolute right-5 top-5 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </span>
          </div>
          <div className="relative mb-3">
            <TextField
              label="Confirm New Password"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            <span
              className="absolute right-5 top-5 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </span>
          </div>
          <p className="text-[12px] md:text-sm text-gray-500 mt-2">
            Your password must be at least 8, maximum 50 characters. It should
            contain at least one number, one lowercase, one uppercase, also
            contain at least one of the following characters: (@$?!%&*)
          </p>
        </div>
        <div className="flex items-center justify-end gap-4 pt-6">
          <CustomButton
            className="text-green-600 btn hover:border-green-300 hover:text-green-300"
            click={() => setPasswordModal(false)}
            title="Cancel"
          />
          <CustomButton
            click={handleSaveClick}
            className="text-white btn bg-green-800 hover:bg-green-300 hover:border-green-300"
            title="Save"
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default ChangePasswordModal;
