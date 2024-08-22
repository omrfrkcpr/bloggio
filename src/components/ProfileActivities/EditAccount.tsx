import { useEffect, useMemo, useState } from "react";
import useAuthCalls from "../../hooks/useAuthCalls";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import EditAccountModal from "../Modals/EditAccountModal";
import EditFieldModal from "../Modals/EditFieldModal";
import ChangePasswordModal from "../Modals/ChangePasswordModal";
import { RootState } from "../../app/store";
import toastNotify from "../../helpers/toastNotify";

const EditAccount = ({
  editModal,
  setEditModal,
  setEditProfileModal,
}: {
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { deleteBlogData } = useBlogCalls();
  const { updateUser, logout } = useAuthCalls();

  const initialFormData = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }),
    []
  );

  const [form, setForm] = useState<User>(initialFormData);
  const [fieldToEdit, setFieldToEdit] = useState<{
    field: string;
    value: string;
    text: string;
  } | null>(null);
  const [passwordModal, setPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setForm({
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        email: currentUser?.email,
        password: "",
        confirmPassword: "",
      });
    } else {
      setForm(initialFormData);
    }
  }, [currentUser, initialFormData]);

  const handleDeleteAccount = async () => {
    if (currentUser && currentUser._id) {
      await deleteBlogData({ url: "users", id: currentUser._id });
      setEditProfileModal(false);
      setEditModal(false);
      logout(false);
    }
  };

  const validateForm = () => {
    if (!form?.email.includes("@")) {
      toastNotify("error", "Invalid email address");
      return false;
    }
    if (form.password && form.password !== form.confirmPassword) {
      toastNotify("error", "Passwords do not match");
      return false;
    }
    return true;
  };

  const saveForm = () => {
    if (!validateForm()) {
      return;
    }

    const myUser = { ...currentUser };
    if (!form.password) {
      delete myUser.password;
    }
    const updatedUser = {
      ...myUser,
      firstName: form?.firstName,
      lastName: form?.lastName,
      email: form?.email,
      password: form?.password ? form.password : undefined,
    };
    updateUser(updatedUser);
    setEditModal(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
    setFieldToEdit(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <EditAccountModal
        editModal={editModal}
        setEditModal={setEditModal}
        setEditProfileModal={setEditProfileModal}
        form={form}
        setFieldToEdit={setFieldToEdit}
        handleDeleteAccount={handleDeleteAccount}
        saveForm={saveForm}
        setPasswordModal={setPasswordModal}
      />
      {fieldToEdit && (
        <EditFieldModal
          fieldToEdit={fieldToEdit}
          setFieldToEdit={setFieldToEdit}
          handleFieldChange={handleFieldChange}
        />
      )}
      {passwordModal && (
        <ChangePasswordModal
          passwordModal={passwordModal}
          setPasswordModal={setPasswordModal}
          form={form}
          setForm={setForm}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          showConfirmPassword={showConfirmPassword}
          toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          saveForm={saveForm}
        />
      )}
    </>
  );
};

export default EditAccount;
