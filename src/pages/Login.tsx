import LoginForm from "../components/Forms/LoginForm";
import { Formik } from "formik";
import { SignupSchema } from "../components/Forms/LoginForm";
import useAuthCalls from "../hooks/useAuthCalls";
import useShowModal from "../hooks/useShowModal";

const Login = () => {
  const { login } = useAuthCalls();
  const { toggleNavbarModal } = useShowModal();
  const { toggleHeroModal } = useShowModal();

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
          toggleNavbarModal(false);
          toggleHeroModal(false);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
        component={(props) => <LoginForm {...props} />}
      ></Formik>
    </div>
  );
};

export default Login;
