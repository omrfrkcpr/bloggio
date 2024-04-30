/* eslint-disable @typescript-eslint/no-explicit-any */
import TextField from "@mui/material/TextField";

interface MyTextFieldProps {
  id: string;
  name: string;
  label: any;
  autoComplete: string;
  type: string;
  value: any;
  onChange: any;
  onBlur: any;
  error: any;
  helperText: any;
}

const MyTextField: React.FC<MyTextFieldProps> = (props) => {
  return <TextField {...props} />;
};

export default MyTextField;
