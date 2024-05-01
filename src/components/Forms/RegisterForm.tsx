import { FormikProps, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import AuthTextField from "../TextFields/AuthTextField";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface FormValues {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
  // bio: string;
  // city: string;
}

interface RegisterFormProps extends FormikProps<FormValues> {
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
      name: "username",
      label: "Enter Username",
      type: "text",
    },
    {
      name: "firstName",
      label: "Your First Name",
      type: "text",
    },
    {
      name: "lastName",
      label: "Your Last Name",
      type: "text",
    },
    { name: "email", label: "Your Email", type: "email" },
    { name: "image", label: "Image Url", type: "text" },
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
          {registerFormFields.map((field) => (
            <div className="relative">
              <AuthTextField
                id={field.name}
                name={field.name}
                label={field.label}
                autoComplete="off"
                type={field.type}
                value={
                  field.name === "confirmPassword" && isSubmitting
                    ? ""
                    : values[field.name as keyof FormValues]
                }
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched[field.name as keyof FormValues] &&
                  Boolean(errors[field.name as keyof FormValues])
                }
                helperText={
                  (touched[field.name as keyof FormValues] &&
                    errors[field.name as keyof FormValues]) ||
                  undefined
                }
              />
              {(field.name === "password" ||
                field.name === "confirmPassword") && (
                <div className="absolute top-4 right-3 sm:top-4 sm:right-3 md:top-[18px] md:right-3 xl:top-[20px] xl:right-3 color-black hover:color-gray">
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white py-1 px-3 rounded-xl mt-4 hover:bg-black/70"
        >
          {isSubmitting ? "Loading..." : "Sign Up"}
        </button>
      </Form>
    </div>
  );
};

export default RegisterForm;
