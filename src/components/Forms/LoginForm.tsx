/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import AuthTextField from "../TextFields/AuthTextField";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { RootState } from "../../app/store";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps extends FormikProps<LoginFormValues> {
  isSubmitting: boolean;
}

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required!"),
});

const LoginForm: React.FC<LoginFormProps> = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading } = useSelector((state: RootState) => state.auth);

  const loginFormFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      id: 1,
    },
    {
      name: "password",
      label: "Password",
      type: `${showPassword ? "text" : "password"}`,
      id: 2,
    },
  ];

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Form autoComplete="off">
        <div className="flex flex-col gap-3 lg:gap-4">
          {loginFormFields.map((field) => (
            <div className="relative" key={field.id}>
              <AuthTextField
                id={field.name}
                name={field.name}
                label={field.label}
                autoComplete="off"
                type={field.type}
                value={values[field.name as keyof LoginFormValues]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched[field.name as keyof LoginFormValues] &&
                  Boolean(errors[field.name as keyof LoginFormValues])
                }
                helperText={
                  (touched[field.name as keyof LoginFormValues] &&
                    errors[field.name as keyof LoginFormValues]) ||
                  undefined
                }
              />
              {field.name === "password" && (
                <div className="absolute top-4 right-3 sm:top-4 sm:right-3 md:top-[18px] md:right-3 xl:top-[20px] xl:right-3 text-black hover:text-black/50">
                  {showPassword ? (
                    <FaRegEyeSlash
                      className="w-4 cursor-pointer"
                      onClick={handlePasswordVisibility}
                    />
                  ) : (
                    <FaRegEye
                      className="w-4 cursor-pointer"
                      onClick={handlePasswordVisibility}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {!loading ? (
          <button
            type="submit"
            className="bg-[#76a9f0] text-white py-1 lg:py-2 text-sm lg:text-[1.1rem] px-3 rounded-xl mt-6 hover:bg-[#9bbeef]"
          >
            Sign In
          </button>
        ) : (
          <div className="bg-[#76a9f0] w-[68px] h-[28px] lg:w-[78px] lg:h-[36px] text-white rounded-xl mt-6 flex items-center justify-center mx-auto">
            <CircularProgress sx={{ color: "white", padding: "0.8rem" }} />
          </div>
        )}
      </Form>
    </div>
  );
};

export default LoginForm;
