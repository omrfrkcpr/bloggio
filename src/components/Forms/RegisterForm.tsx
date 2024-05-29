import { FormikProps, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import AuthTextField from "../TextFields/AuthTextField";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import CustomButton from "../commons/CustomButton";

interface RegisterFormValues {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
  // bio: string;
  // city: string;
}

interface RegisterFormProps extends FormikProps<RegisterFormValues> {
  isSubmitting: boolean;
}

export const SignupSchema = Yup.object().shape({
  username: Yup.string().min(3).max(15).required("Required!"),
  firstName: Yup.string().min(2).max(50).required("Required"),
  lastName: Yup.string().min(2).max(50).required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long")
    .matches(/\d+/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[@$?!%&*]+/,
      "Password must contain at least one of the following characters: (@$?!%&*)"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterForm: React.FC<RegisterFormProps> = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  isSubmitting,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerFormFields = [
    {
      name: "firstName",
      label: "Enter First Name",
      type: "text",
    },
    {
      name: "lastName",
      label: "Enter Last Name",
      type: "text",
    },
    {
      name: "username",
      label: "Enter Username",
      type: "text",
    },
    { name: "email", label: "Enter Email", type: "email" },
    // { name: "image", label: "Image Url", type: "text" },
    // { name: "bio", label: "Your Bio", type: "text" },
    // { name: "city", label: "Your City", type: "text" },
    {
      name: "password",
      label: "Enter Password",
      type: `${showPassword ? "text" : "password"}`,
    },
    {
      name: "confirmPassword",
      label: "Confirm Your Password",
      type: `${showConfirmPassword ? "text" : "password"}`,
    },
  ];

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <Form autoComplete="off">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
          {registerFormFields.map((field, index) => (
            <div className="relative" key={index}>
              <AuthTextField
                id={field.name}
                name={field.name}
                label={field.label}
                autoComplete="off"
                type={field.type}
                value={
                  field.name === "confirmPassword" && isSubmitting
                    ? ""
                    : values[field.name as keyof RegisterFormValues]
                }
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched[field.name as keyof RegisterFormValues] &&
                  Boolean(errors[field.name as keyof RegisterFormValues])
                }
                helperText={
                  (touched[field.name as keyof RegisterFormValues] &&
                    errors[field.name as keyof RegisterFormValues]) ||
                  undefined
                }
              />
              {(field.name === "password" ||
                field.name === "confirmPassword") && (
                <div className="absolute top-4 right-3 sm:top-4 sm:right-3 md:top-[18px] md:right-3 xl:top-[20px] xl:right-3 text-black hover:text-black/50">
                  {field.name === "password" ? (
                    showPassword ? (
                      <FaRegEyeSlash
                        className="w-4 cursor-pointer"
                        onClick={handlePasswordVisibility}
                      />
                    ) : (
                      <FaRegEye
                        className="w-4 cursor-pointer"
                        onClick={handlePasswordVisibility}
                      />
                    )
                  ) : showConfirmPassword ? (
                    <FaRegEyeSlash
                      className="w-4 cursor-pointer"
                      onClick={handleConfirmPasswordVisibility}
                    />
                  ) : (
                    <FaRegEye
                      className="w-4 cursor-pointer"
                      onClick={handleConfirmPasswordVisibility}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <CustomButton
          type="submit"
          disabled={isSubmitting}
          className="bg-[#76a9f0] text-white py-1 lg:py-2 text-sm lg:text-[1.1rem] px-3 rounded-xl mt-6 hover:bg-[#9bbeef] w-[90px] mx-auto"
          title={isSubmitting ? "Loading..." : "Sign Up"}
        />
      </Form>
    </div>
  );
};

export default RegisterForm;
