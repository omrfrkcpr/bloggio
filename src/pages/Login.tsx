import LoginForm from "../components/Forms/LoginForm";
import { Formik } from "formik";
import { SignupSchema } from "../components/Forms/LoginForm";
import useAuthCalls from "../hooks/useAuthCalls";

const Login = () => {
  const { login } = useAuthCalls();

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          // console.log(values);
          login(values);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
        component={(props) => <LoginForm {...props} />}
      ></Formik>
    </div>
  );
};

export default Login;
