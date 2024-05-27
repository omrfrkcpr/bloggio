/* eslint-disable @typescript-eslint/no-explicit-any */
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";


const CustomTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    height: "0.8rem",
    "@media (min-width: 600px)": {
      height: "1rem",
    },
    "@media (min-width: 960px)": {
      height: "1.2rem",
    },
    "@media (min-width: 1280px)": {
      height: "1.4rem",
    },
  },
  "& .MuiFormLabel-root": {
    fontSize: "0.7rem",
    "@media (min-width: 600px)": {
      fontSize: "0.8rem",
    },
    "@media (min-width: 960px)": {
      fontSize: "0.9rem",
    },
    "@media (min-width: 1280px)": {
      fontSize: "1rem",
    },
  },
});

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  type,
  id,
  autoComplete,
  variant,
  value,
  onChange,
  onBlur,
  helperText,
  error,
}) => {
  return (
    <CustomTextField
      name={name}
      label={label}
      type={type}
      id={id}
      inputProps={{
        autoComplete: autoComplete || "off",
      }}
      variant={(variant as any) || "outlined"}
      value={value}
      onChange={onChange}
      onBlur={onBlur || undefined}
      helperText={helperText || ""}
      error={error || false}
      sx={{ width: "100%" }}
    />
  );
};

export default FormTextField;
