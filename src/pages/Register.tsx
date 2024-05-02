import RegisterForm from "../components/Forms/RegisterForm";
import { Formik } from "formik";
import { SignupSchema } from "../components/Forms/RegisterForm";
import useAuthCalls from "../hooks/useAuthCalls";
import useShowModal from "../hooks/useShowModal";

const Register = () => {
  const { register } = useAuthCalls();
  const { toggleNavbarModal } = useShowModal();
  const { toggleHeroModal } = useShowModal();

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
          toggleNavbarModal(false);
          toggleHeroModal(false);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
        component={(props) => <RegisterForm {...props} />}
      ></Formik>
    </div>
  );
};

export default Register;
