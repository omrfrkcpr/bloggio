/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";
import CustomModal from "../../utils/CustomModal";
import TextField from "@mui/material/TextField";
import CustomButton from "../../utils/CustomButton";

const EditFieldModal = ({
  fieldToEdit,
  setFieldToEdit,
  handleFieldChange,
}: {
  fieldToEdit: { field: string; value: string; text: string } | null;
  setFieldToEdit: Dispatch<
    SetStateAction<{ field: string; value: string; text: string } | null>
  >;
  handleFieldChange: (field: string, value: string) => void;
}) => {
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

  return (
    <CustomModal
      modal={!!fieldToEdit}
      hidden=""
      setModal={() => setFieldToEdit(null)}
    >
      <div className="center w-[95%] md:w-[720px] md:h-[485px] bg-white mx-auto shadows my-[1rem] z-10 mb-[3rem] p-[2rem] flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl mb-10 text-center">
            Edit {fieldToEdit && getFieldLabel(fieldToEdit.field)}
          </h2>
          <TextField
            label={fieldToEdit && getFieldLabel(fieldToEdit.field)}
            variant="outlined"
            fullWidth
            value={fieldToEdit?.value}
            onChange={(e) =>
              setFieldToEdit((prevFieldToEdit) => ({
                ...prevFieldToEdit,
                field: prevFieldToEdit?.field || "",
                value: e.target.value,
                text: prevFieldToEdit?.text || "",
              }))
            }
          />
          <p className="text-[12px] md:text-sm text-gray-500 mt-2">
            {fieldToEdit?.text}
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
              handleFieldChange(
                fieldToEdit?.field || "",
                fieldToEdit?.value || ""
              )
            }
            className={`text-white ${btn} bg-green-800 hover:bg-green-300 hover:border-green-300`}
            title="Save"
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default EditFieldModal;
