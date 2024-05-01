/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import AuthTextField from "../TextFields/AuthTextField";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

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
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state: any) => state.auth);

  const loginFormFields = [
    {
      name: "email",
      label: "Your Email Address",
      type: "email",
    },
    {
      name: "password",
      label: "Your Password",
      type: `${showPassword ? "text" : "password"}`,
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
            <div className="relative">
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
                <div className="absolute top-4 right-3 sm:top-4 sm:right-3 md:top-[18px] md:right-3 xl:top-[20px] xl:right-3 color-black hover:color-gray">
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
          <button
            disabled={loading}
            className="bg-[#76a9f0] text-white py-1 lg:py-2 text-sm lg:text-[1.1rem] px-3 rounded-xl mt-6"
          >
            <CircularProgress />
          </button>
        )}
      </Form>
    </div>
  );
};

export default LoginForm;
