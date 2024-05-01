import RegisterForm from "../components/Forms/RegisterForm";
import { Formik } from "formik";
import { SignupSchema } from "../components/Forms/RegisterForm";
import useAuthCalls from "../hooks/useAuthCalls";

const Register = () => {
  const { register } = useAuthCalls();

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          // image: "",
          // bio: "",
          // city: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          register(values);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
        component={(props) => <RegisterForm {...props} />}
      ></Formik>
    </div>
  );
};

export default Register;
